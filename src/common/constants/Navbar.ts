export interface NavigationLink {
  href: string
  label: string
}

export const headerNavigationLinks: NavigationLink[] = [
  { href: '/', label: 'Главная' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contacts', label: 'Contact' },
]

export const footerNavigationLinks: NavigationLink[] = [
  { href: '/about', label: 'О проекте' },
  { href: '/docs', label: 'Документация' },
  { href: '/contacts', label: 'Contact' },
]

export const navbarAuth = {
  login: "Login",
  logout: "Logout",
  modalTitle: "Login",
  themeToggleLabel: "Toggle theme",
} as const;
