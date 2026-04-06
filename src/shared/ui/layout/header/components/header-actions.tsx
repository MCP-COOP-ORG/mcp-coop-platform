"use client";

import React from "react";
import { NavbarItem } from "@/shared/ui/primitives";
import { Button, Dropdown, Tooltip, User, useModal } from "@/shared/ui/primitives";
import { LogIn, Sun, Moon } from "lucide-react";
import type { AppSession } from "@/shared/types/auth";
import { useTheme } from "next-themes";
import { THEME } from "@/shared/constants/theme";
import { useTranslations } from "next-intl";
import LanguageSelector from "@/shared/ui/components/language-selector";
import { getHeaderActionConfig, PROFILE_ACTION_KEYS } from "@/shared/constants/header";
import { useTelegramActionController } from "@/features/auth/hooks/use-telegram";
import { telegramAuthAction } from "@/features/auth/actions";
import dynamic from "next/dynamic";

const LazyTelegramAuthModal = dynamic(
  () => import("@/features/auth/components/telegram-auth-modal").then(mod => mod.TelegramAuthModal),
  { ssr: false }
);

interface HeaderActionsProps {
  session: AppSession;
  onOpenLogin: () => void;
  onLogout: () => void;
  isMobile?: boolean;
  onAction?: () => void;
}

export function HeaderActions({ session, onOpenLogin, onLogout, isMobile = false, onAction }: HeaderActionsProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const t = useTranslations("Header");
  const { isOpen, onOpen, onClose, onOpenChange } = useModal();
  const { execute: handleLink, isPending } = useTelegramActionController({ action: telegramAuthAction, onClose });

  const userName = session?.myProfile?.fullName || session?.myProfile?.email || "User";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === THEME.dark;
  const isAuthenticated = !!session?.myProfile;
  const avatarUrl = session?.myProfile?.avatarUrl || undefined;

  const handleToggleTheme = () => {
    setTheme(isDark ? THEME.light : THEME.dark);
    onAction?.();
  };

  const UserAction = isAuthenticated ? (
    <Dropdown
      placement="bottom-end"
      ariaLabel="User Actions"
      onAction={(key) => {
        if (key === PROFILE_ACTION_KEYS.LOGOUT) onLogout();
        if (key === PROFILE_ACTION_KEYS.LINK_TELEGRAM) {
          onAction?.();
          onOpen();
        }
      }}
      items={getHeaderActionConfig(userName, t)}
    >
      <User
        as="button"
        appVariant="header-profile"
        avatarUrl={avatarUrl}
        name={userName}
      />
    </Dropdown>
  ) : (
    <Tooltip content={t("login")} placement="bottom">
      <Button
        appVariant="icon-only"
        onPress={() => { onOpenLogin(); onAction?.(); }}
        aria-label={t("login")}
      >
        <LogIn size={20} />
      </Button>
    </Tooltip>
  );

  const ThemeAction = (
    <Tooltip content={t("themeToggleLabel")} placement="bottom">
      <Button
        appVariant="icon-only"
        onPress={handleToggleTheme}
        aria-label={t("themeToggleLabel")}
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
        {isOpen && <LazyTelegramAuthModal isOpen={isOpen} onOpenChange={onOpenChange} title={t("linkTelegram")} onAuth={handleLink} isPending={isPending} />}
      </>
    );
  }

  // Mobile render exactly matching desktop layout order: User, Language, Theme (Theme is far-right)
  return (
    <div className="flex flex-row items-center justify-end gap-3 w-full">
      {UserAction}
      <LanguageSelector onAction={onAction} />
      {ThemeAction}
      {isOpen && <LazyTelegramAuthModal isOpen={isOpen} onOpenChange={onOpenChange} title={t("linkTelegram")} onAuth={handleLink} isPending={isPending} />}
    </div>
  );
}
