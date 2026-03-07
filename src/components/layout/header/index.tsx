"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
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
  navigationRoutes,
  navbarAuth,
} from "@/common/constants/Header";
import { useSession } from "@/app/providers";
import { useTheme } from "next-themes";
import AppModal, { useModal } from "@/components/ui/modal";
import AuthForm from "@/features/auth-form";
import { authFormModes, authFormTitles, type AuthFormMode } from "@/common/constants/Form";
import { logout } from "@/features/auth/actions/auth.actions";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session: initialSession }: HeaderProps) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { session } = useSession();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const { isOpen, onOpen, onClose } = useModal();
  const [authMode, setAuthMode] = React.useState<AuthFormMode>(authFormModes.login);
  
  const isAuthenticated = !!session?.user || !!initialSession?.user;

  const links: NavigationLink[] = React.useMemo(() => {
    return headerNavigationLinks.filter((link) => {
      if (link.href === navigationRoutes.dashboard.href) {
        return isAuthenticated;
      }
      return true;
    });
  }, [isAuthenticated]);

  const handleToggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleModeChange = (mode: AuthFormMode) => {
    setAuthMode(mode);
  };

  const handleAuthSuccess = () => {
    setAuthMode(authFormModes.login);
    onClose();
    router.refresh();
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.refresh();
    }
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
          {isAuthenticated ? (
            <Button
              variant="bordered"
              color="danger"
              onPress={handleLogout}
            >
              {navbarAuth.logout}
            </Button>
          ) : (
            <Button
              variant="bordered"
              color="primary"
              onPress={onOpen}
            >
              {navbarAuth.login}
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            variant="bordered"
            onPress={handleToggleTheme}
            aria-label={navbarAuth.themeToggleLabel}
          >
            {mounted ? (isDark ? "🌙" : "☀️") : null}
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
          onSuccess={handleAuthSuccess}
        />
      </AppModal>
    </HeroNavbar>
  );
}

