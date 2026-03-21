"use client";

import React from "react";
import { NavbarItem, Button, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@/shared/ui/components/hero-ui";
import { LogIn, LogOut, Sun, Moon, User as UserIcon } from "lucide-react";
import type { Session } from "next-auth";
import { useTheme } from "next-themes";
import { THEME } from "@/shared/constants/theme";
import { useTranslations } from "next-intl";
import LanguageSelector from "@/shared/ui/components/language-selector";

interface HeaderActionsProps {
  session: Session | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  isMobile?: boolean;
  onAction?: () => void;
}

export function HeaderActions({ session, onOpenLogin, onLogout, isMobile = false, onAction }: HeaderActionsProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const t = useTranslations("Header");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === THEME.dark;
  const isAuthenticated = !!session?.myProfile;

  const handleToggleTheme = () => {
    setTheme(isDark ? THEME.light : THEME.dark);
    onAction?.();
  };

  const UserAction = isAuthenticated ? (
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
        if (key === "logout") onLogout();
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
        onPress={() => { onOpenLogin(); onAction?.(); }}
        aria-label={t("login")}
        className="h-10 w-10 min-w-10"
      >
        <LogIn size={20} />
      </Button>
    </Tooltip>
  );

  const ThemeAction = (
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
  );

  // Desktop render wraps items in NavbarItem list tags
  if (!isMobile) {
    return (
      <>
        <NavbarItem className="max-lg:!hidden">{UserAction}</NavbarItem>
        <NavbarItem className="max-lg:!hidden"><LanguageSelector onAction={onAction} /></NavbarItem>
        <NavbarItem className="max-lg:!hidden">{ThemeAction}</NavbarItem>
      </>
    );
  }

  // Mobile render exactly matching desktop layout order: User, Language, Theme (Theme is far-right)
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full">
      {UserAction}
      <LanguageSelector onAction={onAction} />
      {ThemeAction}
    </div>
  );
}
