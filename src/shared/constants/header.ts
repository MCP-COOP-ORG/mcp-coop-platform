export interface NavigationLink {
  href: string;
  label: string;
}

export const navigationRoutes = {
  home: { href: "/", label: "Home" },
  docs: { href: "/docs", label: "Documentation" },
  status: { href: "/blockchain-status", label: "Blockchain" },
  coops: { href: "/coops", label: "Coops" },
  contacts: { href: "/contact-us", label: "Contact Us" },
  dashboard: { href: "/dashboard", label: "Dashboard" },
} as const;

export const headerNavigationLinks: NavigationLink[] = Object.values(navigationRoutes);

export const protectedRouteKeys = [navigationRoutes.dashboard] as const;

