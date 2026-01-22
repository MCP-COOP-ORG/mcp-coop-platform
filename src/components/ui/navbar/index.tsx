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

import {
  NavigationLink,
  headerNavigationLinks,
  navbarAuth,
} from "@/common/constants/Navbar";
import { useTheme } from "@/app/providers";
import AppModal, { useModal } from "@/components/ui/modal";
import AuthForm from "@/features/auth-form";
import { authFormModes, authFormTitles, type AuthFormMode, type AuthFormData } from "@/common/constants/Form";

export default function AppNavbar() {
  const links: NavigationLink[] = headerNavigationLinks;
  const { isDark, setIsDark } = useTheme();
  const { isOpen, onOpen, onClose } = useModal();
  const [authMode, setAuthMode] = React.useState<AuthFormMode>(authFormModes.login);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAuthSubmit = (data: AuthFormData) => {
    console.log("Auth form submitted:", { mode: authMode, data });
    // TODO: Implement authentication logic
  };

  const handleModeChange = (mode: AuthFormMode) => {
    setAuthMode(mode);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setAuthMode(authFormModes.login);
    }
    onClose();
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
            variant="bordered"
            color="primary"
            onPress={onOpen}
          >
            {navbarAuth.login}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            variant="bordered"
            onPress={handleToggleTheme}
            aria-label={navbarAuth.themeToggleLabel}
          >
            {isDark ? "🌙" : "☀️"}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <AppModal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        title={authFormTitles[authMode]}
        size="md"
      >
        <AuthForm
          mode={authMode}
          onModeChange={handleModeChange}
          onSubmit={handleAuthSubmit}
        />
      </AppModal>
    </HeroNavbar>
  );
}

