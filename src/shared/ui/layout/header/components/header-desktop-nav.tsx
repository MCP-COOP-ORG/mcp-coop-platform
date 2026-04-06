import { NavbarContent, NavbarItem, Button, Dropdown, HeroLink } from "@/shared/ui/primitives";
import { NavigationLink } from "@/shared/constants/header";
import { isNavLinkActive } from "../utils";

interface HeaderDesktopNavProps {
  links: NavigationLink[];
  pathname: string;
  navT: (key: never) => string;
}

export function HeaderDesktopNav({ links, pathname, navT }: HeaderDesktopNavProps) {
  return (
    <NavbarContent className="max-lg:!hidden gap-4" justify="center">
      {links.map((link) => {
        if (link.children) {
          const isDropdownActive = link.children.some((child) =>
            isNavLinkActive(child.href, pathname)
          );

          return (
            <Dropdown
              key={link.translationKey}
              items={link.children.map((child) => ({
                key: child.translationKey,
                label: navT(child.translationKey as never),
                href: child.href!,
              }))}
            >
              <NavbarItem isActive={isDropdownActive}>
                <Button
                  appVariant="nav-dropdown"
                  className={isDropdownActive ? "font-normal text-primary" : ""}
                >
                  {navT(link.translationKey as never)}
                </Button>
              </NavbarItem>
            </Dropdown>
          );
        }

        const isActive = isNavLinkActive(link.href, pathname);
        return (
          <NavbarItem key={link.translationKey} isActive={isActive}>
            <HeroLink href={link.href!} appVariant="nav-item" isActive={isActive}>
              {navT(link.translationKey as never)}
            </HeroLink>
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );
}
