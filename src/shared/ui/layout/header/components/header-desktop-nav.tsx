import { NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@/shared/ui/components/hero-ui";
import { Link } from "@/core/configs/i18n/routing";
import { NavigationLink } from "@/shared/constants/header";
import { isNavLinkActive } from "../utils";
import { ChevronDownIcon } from "@/shared/ui/icons/chevron-down";

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
          const isDropdownActive = link.children.some(child =>
            isNavLinkActive(child.href, pathname)
          );

          return (
            <Dropdown key={link.translationKey}>
              <NavbarItem isActive={isDropdownActive}>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className={`p-0 bg-transparent data-[hover=true]:bg-transparent transition-colors tracking-tight text-medium ${isDropdownActive ? "font-bold text-primary" : "font-medium text-foreground/80 hover:text-foreground"
                      }`}
                    radius="sm"
                    variant="light"
                    endContent={<ChevronDownIcon className="w-4 h-4" />}
                  >
                    {navT(link.translationKey as never)}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={navT(link.translationKey as never)}
                className="w-[200px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {link.children.map((child) => {
                  const isChildActive = isNavLinkActive(child.href, pathname);
                  return (
                    <DropdownItem
                      key={child.translationKey}
                      textValue={navT(child.translationKey as never)}
                    >
                      <Link href={child.href!} className={`w-full h-full flex items-center transition-colors ${isChildActive ? "text-primary font-bold" : "text-foreground"
                        }`}>
                        {navT(child.translationKey as never)}
                      </Link>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          );
        }

        const isActive = isNavLinkActive(link.href, pathname);
        return (
          <NavbarItem key={link.translationKey} isActive={isActive}>
            <Link
              href={link.href!}
              className={`text-medium whitespace-nowrap transition-colors tracking-tight ${isActive ? "font-bold text-primary" : "font-medium text-foreground/80 hover:text-foreground"
                }`}
            >
              {navT(link.translationKey as never)}
            </Link>
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );
}
