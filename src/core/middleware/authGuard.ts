import { NextResponse, type NextRequest } from "next/server";
import { navigationRoutes, protectedRouteKeys } from "@/shared/constants/header";

/**
 * Auth Guard Middleware Logic
 * Extracted from root middleware.ts to keep the entry point clean.
 */
export const authGuard = (req: NextRequest & { auth?: unknown }) => {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRouteKeys.some((route) => {
    // Check if the path is exactly the protected route, or starts with it (e.g. /workspace or /workspace/settings),
    // OR if it has a 2-letter locale prefix followed by the protected route (e.g. /ru/workspace, /en/workspace)
    const normalizedPath = pathname.match(/^\/[a-z]{2}(\/.*)?$/i) 
      ? pathname.replace(/^\/[a-z]{2}/i, "") 
      : pathname;
    
    // If stripped path is empty, it means we are at the root (not protected here, but safe fallback)
    const finalPath = normalizedPath === "" ? "/" : normalizedPath;
    
    return finalPath === route.href || finalPath.startsWith(`${route.href}/`);
  });

  if (isProtectedRoute && !req.auth) {
    const homeUrl = new URL(navigationRoutes.home.href, req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
};
