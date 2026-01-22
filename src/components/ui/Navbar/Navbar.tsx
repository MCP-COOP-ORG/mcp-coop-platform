"use client";

import React from "react";
import Link from "next/link";
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
    <HeroNavbar shouldHideOnScroll maxWidth="xl" isBordered>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">MCP COOP</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link) => (
          <NavbarItem key={link.href}>
            <HeroLink as={Link} color="foreground" href={link.href}>
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
  );
};

export default AppNavbar;

