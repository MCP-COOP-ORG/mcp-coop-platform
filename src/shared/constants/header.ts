export type NavigationRouteKey = "home" | "docs" | "status" | "networkStatus" | "coops" | "contacts" | "workspace";

export interface NavigationLink {
  href?: string;
  translationKey: NavigationRouteKey;
  children?: NavigationLink[];
}

export const navigationRoutes = {
  home: { href: "/", translationKey: "home" },
  docs: { href: "/docs", translationKey: "docs" },
  status: { href: "/blockchain-status", translationKey: "status" },
  networkStatus: { href: "/blockchain-status", translationKey: "networkStatus" },
  coops: { href: "/coops", translationKey: "coops" },
  contacts: { href: "/contact-us", translationKey: "contacts" },
  workspace: { href: "/workspace", translationKey: "workspace" },
} as const;

export const headerNavigationLinks: NavigationLink[] = [
  navigationRoutes.home,
  {
    translationKey: "status",
    children: [
      navigationRoutes.docs,
      navigationRoutes.networkStatus,
    ],
  },
  navigationRoutes.coops,
  navigationRoutes.workspace,
];

export const protectedRouteKeys = [navigationRoutes.workspace] as const;

/**
 * i18n keys for the Header namespace (not user-facing, used with useTranslations("Header")).
 */
export const headerI18nKeys = {
  openMenu: "openMenu",
  closeMenu: "closeMenu",
} as const;
