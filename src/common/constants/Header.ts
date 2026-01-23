export interface NavigationLink {
  href: string
  label: string
}

export const headerNavigationLinks: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Documentation' },
  { href: '/status', label: 'Blockchain' },
  { href: '/coops', label: 'Coops' },
  { href: '/contacts', label: 'Contact Us' },
  { href: '/dashboard', label: 'Dashboard' }, 
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
