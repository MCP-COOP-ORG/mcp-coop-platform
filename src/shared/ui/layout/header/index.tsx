"use client";

import React from "react";
import { Link, useRouter, usePathname } from "@/core/configs/i18n/routing";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "@/shared/ui/primitives";
import Image from "next/image";

import {
  NavigationLink,
  headerNavigationLinks,
  navigationRoutes,
  headerI18nKeys,
} from "@/shared/constants/header";
import { APP_INFO } from "@/shared/constants/app-info";
import { useSession } from "@/shared/hooks/use-session";
import { Modal, useModal } from "@/shared/ui/primitives";
import AuthForm from "@/features/auth/components/auth-form";
import { logout } from "@/features/auth/actions";
import { useTranslations } from "next-intl";

// Sub-components
import { HeaderDesktopNav } from "./components/header-desktop-nav";
import { HeaderActions } from "./components/header-actions";
import { HeaderMobileMenu } from "./components/header-mobile-menu";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const navT = useTranslations("Navigation");
  const headerT = useTranslations("Header");

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onClose } = useModal();

  const isAuthenticated = !!session?.myProfile;

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const links: NavigationLink[] = React.useMemo(() => {
    return headerNavigationLinks.filter((link) => {
      if (link.href === navigationRoutes.workspace.href) {
        return isAuthenticated;
      }
      return true;
    });
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    onClose();
    router.refresh();
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.refresh();
    }
  };

  return (
    <HeroNavbar
      maxWidth="xl"
      className="bg-background border-b border-divider z-[9999]"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Logo */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={APP_INFO.logo}
              alt={APP_INFO.shortName}
              width={40}
              height={40}
              priority
              className="object-contain"
            />
            <p className="font-bold text-inherit text-[28px] leading-none tracking-tight">
              {APP_INFO.shortName}
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <HeaderDesktopNav links={links} pathname={pathname} navT={navT} />

      <NavbarContent justify="end">
        <HeaderActions
          session={session}
          onOpenLogin={onOpen}
          onLogout={handleLogout}
        />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? headerT(headerI18nKeys.closeMenu) : headerT(headerI18nKeys.openMenu)}
          className="max-lg:!flex lg:!hidden"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <HeaderMobileMenu
        links={links}
        pathname={pathname}
        navT={navT}
        session={session}
        onOpenLogin={onOpen}
        onLogout={handleLogout}
        onAction={() => setIsMenuOpen(false)}
      />

      {/* Auth Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => { if (!open) onClose(); }}
        title={headerT("welcome")}
        size="md"
      >
        <AuthForm onSuccess={handleAuthSuccess} />
      </Modal>
    </HeroNavbar>
  );
}
