import { INTERNAL_API_URL } from "@/shared/constants/auth";

// --- Main Interceptor ---
export const openApiMutator = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const isServer = typeof window === 'undefined';

  const response = await executeRequest(url, options, isServer);

  // Client-side silent refresh: intercept 401 in the browser, refresh tokens, retry once.
  // Server-side refresh is handled by the proxy before the page renders.
  if (!isServer && response.status === 401) {
    const refreshed = await attemptClientRefresh();
    if (refreshed) {
      const retryResponse = await executeRequest(url, options, isServer);
      return handleResponse<T>(retryResponse);
    }
  }

  return handleResponse<T>(response);
};

async function executeRequest(
  url: string,
  options: RequestInit,
  isServer: boolean
): Promise<Response> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (isServer) {
    await attachServerCookies(headers);
  } else {
    options.credentials = 'include';
  }

  const response = await fetch(buildAbsoluteUrl(url), {
    ...options,
    headers,
  });

  if (isServer) {
    await syncResponseCookies(response);
  }

  return response;
}

// Client-side only. Server-side refresh is handled by the proxy.
async function attemptClientRefresh(): Promise<boolean> {
  try {
    const response = await executeRequest('/api/auth/refresh', { method: 'POST' }, false);
    return response.ok;
  } catch {
    return false;
  }
}

// --- Helpers (Inlined to bypass Orval parser issues) ---

async function attachServerCookies(headers: Headers) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { cookies } = require('next/headers');
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  if (allCookies.length > 0) {
    const cookieString = allCookies.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
    headers.set('Cookie', cookieString);
  }
}

async function syncResponseCookies(response: Response) {
  const setCookieHeader = response.headers.getSetCookie();
  if (!setCookieHeader || setCookieHeader.length === 0) return;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { cookies } = require('next/headers');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const setCookieParser = require('set-cookie-parser');
  const cookieStore = await cookies();

  const parsedCookies = setCookieParser.parse(setCookieHeader.join(","));
  for (const cookie of parsedCookies) {
    cookieStore.set({
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path || "/",
      expires: cookie.expires,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as "strict" | "lax" | "none" | true | false | undefined,
      maxAge: cookie.maxAge,
    });
  }
}

function buildAbsoluteUrl(url: string): string {
  const envUrl = INTERNAL_API_URL.replace(/\/+$/, "");
  const baseUrl = envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
  return `${baseUrl}${url}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || errorData?.error || `API Error ${response.status}: ${response.statusText}`);
  }

  const text = await response.text();
  try {
    return (text ? JSON.parse(text) : undefined) as T;
  } catch {
    return text as unknown as T;
  }
}
