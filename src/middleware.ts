import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { navigationRoutes, protectedRouteKeys } from "@/common/constants/Header";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRouteKeys.some((route) =>
    pathname.startsWith(route.href)
  );

  if (isProtectedRoute && !req.auth) {
    const homeUrl = new URL(navigationRoutes.home.href, req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Next.js requires matcher to be statically analyzable literals
  matcher: ["/dashboard/:path*"],
};

