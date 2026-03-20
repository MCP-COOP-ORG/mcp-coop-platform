import React, { useState } from "react";
import { NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Link } from "@/core/configs/i18n/routing";
import { NavigationLink } from "@/shared/constants/header";

interface HeaderDesktopNavProps {
  links: NavigationLink[];
  pathname: string;
  navT: (key: any) => string;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5"/>
  </svg>
);

export function HeaderDesktopNav({ links, pathname, navT }: HeaderDesktopNavProps) {
  return (
    <NavbarContent className="max-lg:!hidden gap-4" justify="center">
      {links.map((link) => {

        if (link.children) {
          const isDropdownActive = link.children.some(child => 
            child.href ? (child.href === "/" ? pathname === "/" : pathname.startsWith(child.href)) : false
          );

          return (
            <Dropdown key={link.translationKey}>
              <NavbarItem isActive={isDropdownActive}>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className={`p-0 bg-transparent data-[hover=true]:bg-transparent transition-colors tracking-tight text-medium ${
                      isDropdownActive ? "font-bold text-primary" : "font-medium text-foreground/80 hover:text-foreground"
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
                  const isChildActive = child.href ? (child.href === "/" ? pathname === "/" : pathname.startsWith(child.href)) : false;
                  return (
                    <DropdownItem
                      key={child.translationKey}
                      textValue={navT(child.translationKey as never)}
                    >
                      <Link href={child.href!} className={`w-full h-full flex items-center transition-colors ${
                        isChildActive ? "text-primary font-bold" : "text-foreground"
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

        const isActive = link.href ? (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) : false;
        return (
          <NavbarItem key={link.translationKey} isActive={isActive}>
            <Link
              href={link.href!}
              className={`text-medium whitespace-nowrap transition-colors tracking-tight ${
                isActive ? "font-bold text-primary" : "font-medium text-foreground/80 hover:text-foreground"
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
