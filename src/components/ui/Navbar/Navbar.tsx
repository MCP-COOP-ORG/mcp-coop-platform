"use client";

import React from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as HeroLink,
  Button,
} from "@heroui/react";

import { NavigationLink, headerNavigationLinks } from "@/common/constants/Navbar";
import { useTheme } from "@/app/providers";

const AppNavbar: React.FC = () => {
  const links: NavigationLink[] = headerNavigationLinks;
  const { isDark, setIsDark } = useTheme();

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="navbar-wrapper">
      <HeroNavbar
        as="nav"
        shouldHideOnScroll
        maxWidth="xl"
        className="navbar"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">MCP COOP</p>
        </NavbarBrand>

        <NavbarContent className="gap-4">
          {links.map((link) => (
            <NavbarItem key={link.href}>
              <HeroLink color="foreground" href={link.href}>
                {link.label}
              </HeroLink>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={handleToggleTheme}
              aria-label="Переключить тему"
            >
              {isDark ? "🌙" : "☀️"}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </HeroNavbar>
    </div>
  );
};

export default AppNavbar;

