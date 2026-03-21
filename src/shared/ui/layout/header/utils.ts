/**
 * Checks whether a navigation link is currently active based on the pathname.
 * Handles root path ("/") as exact match, all others as prefix match.
 */
export function isNavLinkActive(
  href: string | undefined,
  pathname: string,
): boolean {
  if (!href) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
