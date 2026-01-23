export interface NavigationLink {
  href: string;
  label: string;
}

export const navigationRoutes = {
  home: { href: "/", label: "Home" },
  docs: { href: "/docs", label: "Documentation" },
  status: { href: "/status", label: "Blockchain" },
  coops: { href: "/coops", label: "Coops" },
  contacts: { href: "/contacts", label: "Contact Us" },
  dashboard: { href: "/dashboard", label: "Dashboard" },
} as const;

export const headerNavigationLinks: NavigationLink[] = Object.values(navigationRoutes);

export const protectedRouteKeys = [navigationRoutes.dashboard] as const;


export const navbarAuth = {
  login: "Login",
  logout: "Logout",
  modalTitle: "Login",
  themeToggleLabel: "Toggle theme",
} as const;
