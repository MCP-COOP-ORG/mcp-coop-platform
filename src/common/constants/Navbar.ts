export interface NavigationLink {
  href: string
  label: string
}

export const headerNavigationLinks: NavigationLink[] = [
  { href: '/', label: 'Главная' },
  { href: '/dashboard', label: 'Dashboard' },
]

export const footerNavigationLinks: NavigationLink[] = [
  { href: '/about', label: 'О проекте' },
  { href: '/docs', label: 'Документация' },
  { href: '/contact', label: 'Контакты' },
]

