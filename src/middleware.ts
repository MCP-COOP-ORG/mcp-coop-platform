import NextAuth from "next-auth";
import authConfig from "@/core/configs/auth/auth.config";
import { authGuard } from "@/core/middleware/authGuard";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/core/configs/i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const authResponse = authGuard(req);
  if (authResponse) {
    // If authGuard explicitly redirects, return it.
    // However, we want to allow next-intl to do its work if there's no redirect.
    if (authResponse.status === 307 || authResponse.status === 308 || authResponse.headers.get("Location")) {
       return authResponse;
    }
  }

  // Otherwise, handle i18n routing
  return handleI18nRouting(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

