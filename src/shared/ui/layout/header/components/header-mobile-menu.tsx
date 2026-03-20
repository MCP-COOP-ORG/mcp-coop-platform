import React from "react";
import { NavbarMenu, NavbarMenuItem, Link as HeroLink } from "@heroui/react";
import { Link } from "@/core/configs/i18n/routing";
import { NavigationLink } from "@/shared/constants/header";
import { HeaderActions } from "./header-actions";
import type { Session } from "next-auth";

interface HeaderMobileMenuProps {
  links: NavigationLink[];
  pathname: string;
  navT: (key: any) => string;
  session: Session | null;
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
  // Premium Layout: 
  // - Added backdrop support (in case NavbarMenu is slightly transparent).
  // - Separated the Actions Bar from the Links using a clean Divider-like border.
  // - Increased typography size to text-2xl for better visual hierarchy and touch targets.
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

      {/* Action Bar (Top) - Wrapped in foolproof padding block to force perfectly symmetrical margin from top line and the links below */}
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
            return (
              <React.Fragment key={link.translationKey}>
                <NavbarMenuItem className="pt-2">
                  <span className="w-full py-2 text-xl font-bold text-foreground/50 tracking-tight block">
                    {navT(link.translationKey as never)}
                  </span>
                </NavbarMenuItem>
                {link.children.map((child) => {
                  const isChildActive = child.href ? (child.href === "/" ? pathname === "/" : pathname.startsWith(child.href)) : false;
                  return (
                    <NavbarMenuItem key={child.translationKey} isActive={isChildActive}>
                      <HeroLink
                        as={Link}
                        color={isChildActive ? "primary" : "foreground"}
                        href={child.href!}
                        className={`w-full py-2 text-xl transition-colors tracking-tight ${
                          isChildActive ? "font-bold text-primary" : "font-medium text-foreground/80 hover:text-foreground"
                        }`}
                        size="lg"
                      >
                        {navT(child.translationKey as never)}
                      </HeroLink>
                    </NavbarMenuItem>
                  );
                })}
              </React.Fragment>
            );
          }

          const isActive = link.href ? (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) : false;
          return (
            <NavbarMenuItem key={link.translationKey} isActive={isActive}>
              <HeroLink
                as={Link}
                color={isActive ? "primary" : "foreground"}
                href={link.href!}
                className={`w-full py-2 text-xl transition-colors tracking-tight ${
                  isActive ? "font-bold text-primary" : "font-medium text-foreground/80 hover:text-foreground"
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
