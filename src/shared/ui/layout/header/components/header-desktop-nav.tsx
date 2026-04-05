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
                    className={`group p-0 bg-transparent data-[hover=true]:bg-transparent transition-colors uppercase tracking-wider text-medium ${isDropdownActive ? "font-normal text-primary" : "font-light text-foreground/80 hover:text-foreground"
                      }`}
                    radius="sm"
                    variant="light"
                    endContent={<ChevronDownIcon className="w-[14px] h-[14px] scale-x-[0.85] text-foreground transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-data-[open=true]:rotate-180" />}
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
                      as={Link}
                      href={child.href!}
                      className={`transition-colors text-[13px] uppercase tracking-wider ${isChildActive ? "text-primary font-normal" : "text-foreground font-light"
                        }`}
                    >
                      {navT(child.translationKey as never)}
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
              className={`text-medium whitespace-nowrap transition-colors uppercase tracking-wider ${isActive ? "font-normal text-primary" : "font-light text-foreground/80 hover:text-foreground"
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
