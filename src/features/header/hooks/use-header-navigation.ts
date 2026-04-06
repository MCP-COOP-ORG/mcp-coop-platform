import { usePathname } from "@/core/configs/i18n/routing";
import { useTranslations } from "next-intl";
import { headerNavigationLinks, protectedRouteKeys } from "@/shared/constants/header";
import { useSession } from "@/shared/hooks/use-session";
import type { MappedNavigationLink } from "@/entities/header/types";

export function isNavLinkActive(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function useHeaderNavigation() {
  const pathname = usePathname();
  const navT = useTranslations("Navigation");
  const session = useSession();
  const user = session?.myProfile;

  const visibleLinks = user
    ? headerNavigationLinks
    : headerNavigationLinks.filter(
        (link) => !protectedRouteKeys.some((route) => route.translationKey === link.translationKey)
      );

  const mappedLinks: MappedNavigationLink[] = visibleLinks.map((link) => {
    if (link.children) {
      const isGroupActive = link.children.some((child) => isNavLinkActive(child.href, pathname));
      return {
        key: link.translationKey as string,
        label: navT(link.translationKey as never).toUpperCase(),
        isGroupActive,
        isActive: isGroupActive, // Groups are considered active if a child is active
        children: link.children.map((child) => ({
          key: child.translationKey as string,
          label: navT(child.translationKey as never).toUpperCase(),
          href: child.href!,
          isActive: isNavLinkActive(child.href, pathname),
        })),
      };
    }

    return {
      key: link.translationKey as string,
      href: link.href!,
      label: navT(link.translationKey as never).toUpperCase(),
      isActive: isNavLinkActive(link.href, pathname),
    };
  });

  return { links: mappedLinks };
}
