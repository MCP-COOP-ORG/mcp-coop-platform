import { NextResponse, type NextRequest } from "next/server";
import { navigationRoutes, protectedRouteKeys } from "@/shared/constants/header";

/**
 * Auth Guard Middleware Logic
 * Extracted from root middleware.ts to keep the entry point clean.
 */
export const authGuard = (req: NextRequest & { auth?: any }) => {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRouteKeys.some((route) =>
    pathname.startsWith(route.href)
  );

  if (isProtectedRoute && !req.auth) {
    const homeUrl = new URL(navigationRoutes.home.href, req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
};
