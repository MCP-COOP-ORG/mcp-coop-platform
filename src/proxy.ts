import { jwtVerify } from "jose";
import { type NextRequest } from "next/server";
import { authGuard } from "@/core/middleware/authGuard";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/core/configs/i18n/routing";
import { AUTH_COOKIE } from "@/shared/constants/auth";

const handleI18nRouting = createMiddleware(routing);

/**
 * Verifies the access token JWT from backend cookies.
 * Runs on Edge Runtime — uses `jose` (Edge-compatible).
 */
async function verifyAccessToken(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(AUTH_COOKIE.accessToken)?.value;
  if (!token) return false;

  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const isAuthenticated = await verifyAccessToken(req);

  const guardResponse = authGuard(req, isAuthenticated);
  if (guardResponse) return guardResponse;

  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
