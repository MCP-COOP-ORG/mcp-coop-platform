import { INTERNAL_API_URL } from "@/shared/constants/auth";

// --- Main Interceptor ---
export const openApiMutator = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const isServer = typeof window === "undefined";

  const response = await executeRequest(url, options, isServer);

  // Exclude /auth/ endpoints (like login, verify, refresh) from global 401 handling
  // because 401 is an expected business logic failure (wrong password, wrong code, etc.)
  const isAuthEndpoint = url.includes("/auth/");

  if (!isServer && response.status === 401 && !isAuthEndpoint) {
    const refreshed = await attemptClientRefresh();
    if (refreshed) {
      const retryResponse = await executeRequest(url, options, isServer);
      return handleResponse<T>(retryResponse);
    } else {
      // Fallback: clear session and bounce to public fallback
      window.location.href = `/api/auth/clear-session?callbackUrl=${encodeURIComponent(
        window.location.pathname
      )}`;
      await new Promise(() => {}); // Pause execution while navigating
    }
  }

  if (isServer && response.status === 401 && !isAuthEndpoint) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { redirect } = require("next/navigation");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { headers } = require("next/headers");
    
    // Attempt to get the current URL path from server headers if available
    const headerStore = await headers();
    const referer = headerStore.get("referer");
    let callbackUrl = "/";
    if (referer) {
      try {
        callbackUrl = new URL(referer).pathname;
      } catch {
        callbackUrl = "/";
      }
    }
    
    redirect(`/api/auth/clear-session?callbackUrl=${encodeURIComponent(callbackUrl)}`);
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
    const errorData = (await response.json().catch(() => null)) as Record<string, unknown> | null;
    const msg = errorData?.message || errorData?.error;
    const finalMsg =
      typeof msg === "string"
        ? msg
        : `API Error ${response.status}: ${response.statusText}`;
        
    throw new Error(finalMsg);
  }

  const text = await response.text();
  let data: unknown;
  
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = text;
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as unknown as T;
}
