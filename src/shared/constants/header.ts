export type NavigationRouteKey = "home" | "docs" | "status" | "coops" | "contacts" | "dashboard";

export interface NavigationLink {
  href: string;
  translationKey: NavigationRouteKey;
}

export const navigationRoutes = {
  home: { href: "/", translationKey: "home" },
  docs: { href: "/docs", translationKey: "docs" },
  status: { href: "/blockchain-status", translationKey: "status" },
  coops: { href: "/coops", translationKey: "coops" },
  contacts: { href: "/contact-us", translationKey: "contacts" },
  dashboard: { href: "/dashboard", translationKey: "dashboard" },
} as const;

export const headerNavigationLinks: NavigationLink[] = [
  navigationRoutes.home,
  navigationRoutes.docs,
  navigationRoutes.status,
  navigationRoutes.coops,
  navigationRoutes.dashboard,
];

export const protectedRouteKeys = [navigationRoutes.dashboard] as const;

export const APP_NAME = "MCP COOP";
