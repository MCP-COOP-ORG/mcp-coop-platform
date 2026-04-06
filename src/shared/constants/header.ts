import React from "react";
import { Link2, LogOut } from "lucide-react";

export type NavigationRouteKey = "home" | "docs" | "blockchain" | "networkStatus" | "community" | "coops" | "members" | "contacts" | "workspace";

export interface NavigationLink {
  href?: string;
  translationKey: NavigationRouteKey;
  children?: NavigationLink[];
}

export const navigationRoutes = {
  home: { href: "/", translationKey: "home" },
  docs: { href: "/docs", translationKey: "docs" },
  networkStatus: { href: "/blockchain-status", translationKey: "networkStatus" },
  coops: { href: "/coops", translationKey: "coops" },
  members: { href: "/members", translationKey: "members" },
  contacts: { href: "/contact-us", translationKey: "contacts" },
  workspace: { href: "/workspace", translationKey: "workspace" },
} as const;

export const headerNavigationLinks: NavigationLink[] = [
  navigationRoutes.home,
  {
    translationKey: "community",
    children: [
      navigationRoutes.coops,
      navigationRoutes.members,
    ],
  },
  {
    translationKey: "blockchain",
    children: [
      navigationRoutes.networkStatus,
      navigationRoutes.docs,
    ],
  },
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

export const PROFILE_ACTION_KEYS = {
  LINK_TELEGRAM: "link-telegram",
  LOGOUT: "logout",
} as const;

export const headerProfileDropdownActions = [
  {
    key: PROFILE_ACTION_KEYS.LINK_TELEGRAM,
    translationKey: "linkTelegram",
    icon: React.createElement(Link2, { size: 18 }),
  },
  {
    key: PROFILE_ACTION_KEYS.LOGOUT,
    translationKey: "logout",
    color: "danger" as const,
    icon: React.createElement(LogOut, { size: 18 }),
  }
];

export const getHeaderActionConfig = (
  userName: string,
  t: (key: string) => string
) => [
  {
    key: "profile",
    label: t("signedInAs"),
    description: userName,
    isReadOnly: true,
  },
  ...headerProfileDropdownActions.map((action) => ({
    ...action,
    label: t(action.translationKey),
  }))
];
