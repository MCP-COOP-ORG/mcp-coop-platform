import { NextResponse, type NextRequest } from "next/server";
import { navigationRoutes, protectedRouteKeys } from "@/shared/constants/header";

/**
 * Auth Guard Middleware Logic.
 * Pure function — receives authentication state as a boolean parameter.
 * No dependency on any auth library.
 */
export const authGuard = (req: NextRequest, isAuthenticated: boolean) => {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRouteKeys.some((route) => {
    const normalizedPath = pathname.match(/^\/[a-z]{2}(\/.*)?$/i)
      ? pathname.replace(/^\/[a-z]{2}/i, "")
      : pathname;

    const finalPath = normalizedPath === "" ? "/" : normalizedPath;

    return finalPath === route.href || finalPath.startsWith(`${route.href}/`);
  });

  if (isProtectedRoute && !isAuthenticated) {
    const homeUrl = new URL(navigationRoutes.home.href, req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }
};
