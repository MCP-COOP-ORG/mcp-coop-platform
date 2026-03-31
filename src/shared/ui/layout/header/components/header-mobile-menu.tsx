import React from "react";
import { NavbarMenu, NavbarMenuItem, HeroLink } from "@/shared/ui/components/hero-ui";
import { Link } from "@/core/configs/i18n/routing";
import { NavigationLink } from "@/shared/constants/header";
import { HeaderActions } from "./header-actions";
import { isNavLinkActive } from "../utils";
import type { AppSession } from "@/shared/types/auth";

interface HeaderMobileMenuProps {
  links: NavigationLink[];
  pathname: string;
  navT: (key: never) => string;
  session: AppSession;
  onOpenLogin: () => void;
  onLogout: () => void;
  onAction?: () => void;
}

export function HeaderMobileMenu({
  links,
  pathname,
  navT,
  session,
  onOpenLogin,
  onLogout,
  onAction,
}: HeaderMobileMenuProps) {
  return (
    <NavbarMenu
      className="pb-4 px-4 pt-4 z-[99999] border-t border-divider"
      motionProps={{
        initial: { opacity: 0, y: -15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
        transition: { type: "spring", bounce: 0, duration: 0.4 },
      }}
    >

      {/* Action Bar (Top) */}
      <div className="w-full">
        <HeaderActions
          isMobile={true}
          session={session}
          onOpenLogin={onOpenLogin}
          onLogout={onLogout}
          onAction={onAction}
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2">
        {links.map((link) => {
          if (link.children) {
            const isDropdownActive = link.children.some(child =>
              isNavLinkActive(child.href, pathname)
            );

            return (
              <React.Fragment key={link.translationKey}>
                <NavbarMenuItem className="pt-1">
                  <span className={`w-full py-[5px] text-xl font-normal uppercase tracking-wider block ${isDropdownActive ? "text-primary" : "text-foreground"}`}>
                    {navT(link.translationKey as never)}
                  </span>
                </NavbarMenuItem>
                {link.children.map((child) => {
                  const isChildActive = isNavLinkActive(child.href, pathname);
                  return (
                    <NavbarMenuItem key={child.translationKey} isActive={isChildActive}>
                      <HeroLink
                        as={Link}
                        color={isChildActive ? "primary" : "foreground"}
                        href={child.href!}
                        className={`w-full py-[3px] pl-[10px] text-[14.5px] transition-colors uppercase tracking-wider ${
                          isChildActive ? "font-normal text-primary" : "font-light text-foreground/80 hover:text-foreground"
                        }`}
                        size="md"
                      >
                        {navT(child.translationKey as never)}
                      </HeroLink>
                    </NavbarMenuItem>
                  );
                })}
              </React.Fragment>
            );
          }

          const isActive = isNavLinkActive(link.href, pathname);
          return (
            <NavbarMenuItem key={link.translationKey} isActive={isActive}>
              <HeroLink
                as={Link}
                color={isActive ? "primary" : "foreground"}
                href={link.href!}
                className={`w-full py-[5px] text-xl transition-colors uppercase tracking-wider ${
                  isActive ? "font-normal text-primary" : "font-light text-foreground/80 hover:text-foreground"
                }`}
                size="lg"
              >
                {navT(link.translationKey as never)}
              </HeroLink>
            </NavbarMenuItem>
          );
        })}
      </div>

    </NavbarMenu>
  );
}
