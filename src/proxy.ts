import { NextResponse, type NextRequest } from "next/server";
import { authGuard } from "@/core/middleware/authGuard";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/core/configs/i18n/routing";
import { AUTH_COOKIE, INTERNAL_API_URL } from "@/shared/constants/auth";
import { getAuthControllerRefreshUrl } from "@/shared/open-api/auth/auth";

const handleI18nRouting = createMiddleware(routing);

// Edge Runtime: openApiMutator unavailable here, raw fetch is required.
async function silentRefresh(refreshToken: string): Promise<string[] | null> {
  try {
    const envUrl = INTERNAL_API_URL.replace(/\/+$/, "");
    const baseUrl = envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
    const response = await fetch(`${baseUrl}${getAuthControllerRefreshUrl()}`, {
      method: "POST",
      headers: { Cookie: `${AUTH_COOKIE.refreshToken}=${refreshToken}` },
    });

    if (!response.ok) return null;

    const setCookies = response.headers.getSetCookie();
    return setCookies.length > 0 ? setCookies : null;
  } catch {
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(AUTH_COOKIE.accessToken)?.value;
  const refreshToken = req.cookies.get(AUTH_COOKIE.refreshToken)?.value;

  if (!accessToken && refreshToken) {
    const newCookies = await silentRefresh(refreshToken);
    if (newCookies) {
      const response = NextResponse.redirect(req.nextUrl);
      for (const cookie of newCookies) {
        response.headers.append("Set-Cookie", cookie);
      }
      return response;
    }
  }

  const guardResponse = authGuard(req, !!accessToken);
  if (guardResponse) return guardResponse;

  return handleI18nRouting(req);
}

export const config = {
  matcher: [
    "/",
    "/(ru|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
