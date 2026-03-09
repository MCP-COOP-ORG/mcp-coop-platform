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
} from "@/shared/constants/header";
import { useSession } from "@/core/providers/providers";
import { useTheme } from "next-themes";
import AppModal, { useModal } from "@/shared/ui/components/modal";
import AuthForm from "@/features/auth/components/auth-form";
import LanguageSelector from "@/shared/ui/components/language-selector";
import { authFormModes, authFormTitles, type AuthFormMode } from "@/shared/constants/form";
import { logout } from "@/features/auth/actions/auth.actions";
import { useTranslations } from "next-intl";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session: initialSession }: HeaderProps) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { session } = useSession();
  const t = useTranslations("Header");

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
              className="h-10"
            >
              {t("logout")}
            </Button>
          ) : (
            <Button
              variant="bordered"
              color="primary"
              onPress={onOpen}
              className="h-10"
            >
              {t("login")}
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <LanguageSelector />
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            variant="bordered"
            onPress={handleToggleTheme}
            aria-label={t("themeToggleLabel")}
            className="h-10 w-10 min-w-10"
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

