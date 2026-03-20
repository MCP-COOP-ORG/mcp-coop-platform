"use client";

import React from "react";
import { Link, useRouter, usePathname } from "@/core/configs/i18n/routing";
import type { Session } from "next-auth";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as HeroLink,
  Button,
  Image,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { LogIn, LogOut, Sun, Moon, User as UserIcon } from "lucide-react";

import {
  NavigationLink,
  headerNavigationLinks,
  navigationRoutes,
  APP_NAME,
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
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { session } = useSession();
  const t = useTranslations("Header");
  const navT = useTranslations("Navigation");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const { isOpen, onOpen, onClose } = useModal();
  const [authMode, setAuthMode] = React.useState<AuthFormMode>(authFormModes.login);

  const isAuthenticated = !!session?.myProfile || !!initialSession?.myProfile;

  const links: NavigationLink[] = React.useMemo(() => {
    return headerNavigationLinks.filter((link) => {
      if (link.href === navigationRoutes.workspace.href) {
        return isAuthenticated;
      }
      return true;
    });
  }, [isAuthenticated]);

  const handleToggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
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
        <NavbarBrand className="h-full py-1">
          <Link href="/" className="flex items-center gap-4 h-full">
            <Image
              src="/logo.png"
              alt={APP_NAME}
              className="h-[80%] w-auto object-contain"
              radius="none"
              disableSkeleton
            />
            <p className="font-bold text-inherit text-[28px] leading-none tracking-tight">{APP_NAME}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="max-sm:hidden sm:flex gap-4" justify="center">
        {links.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <NavbarItem key={link.href} isActive={isActive}>
              <HeroLink
                as={Link}
                color={isActive ? "primary" : "foreground"}
                href={link.href}
                className={isActive ? "font-bold" : ""}
              >
                {navT(link.translationKey as never)}
              </HeroLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    radius: "md",
                    className: "w-10 h-10 min-w-10 min-h-10 border-2 border-success box-border bg-primary/80 text-primary-foreground transition-transform cursor-pointer",
                    icon: <UserIcon size={20} />,
                  }}
                  className="transition-transform"
                  classNames={{
                    base: "flex-row-reverse gap-3",
                    name: "max-w-[100px] truncate block font-medium",
                  }}
                  name={session?.myProfile?.fullName || session?.myProfile?.email || "User"}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat" onAction={(key) => {
                if (key === "logout") handleLogout();
              }}>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{t("signedInAs")}</p>
                  <p className="font-semibold">{session?.myProfile?.email || "User"}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" startContent={<LogOut size={16} />}>
                  {t("logout")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Tooltip content={t("login")} placement="bottom">
              <Button
                isIconOnly
                variant="bordered"
                color="primary"
                onPress={onOpen}
                aria-label={t("login")}
                className="h-10 w-10 min-w-10"
              >
                <LogIn size={20} />
              </Button>
            </Tooltip>
          )}
        </NavbarItem>
        <NavbarItem>
          <LanguageSelector />
        </NavbarItem>
        <NavbarItem>
          <Tooltip content={t("themeToggleLabel")} placement="bottom">
            <Button
              isIconOnly
              variant="bordered"
              onPress={handleToggleTheme}
              aria-label={t("themeToggleLabel")}
              className="h-10 w-10 min-w-10"
            >
              {mounted ? (isDark ? <Moon size={20} /> : <Sun size={20} />) : null}
            </Button>
          </Tooltip>
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

