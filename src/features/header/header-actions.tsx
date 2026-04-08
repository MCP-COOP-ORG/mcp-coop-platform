"use client";

import { Sun, Moon, LogIn } from "lucide-react";
import { Button, Dropdown, Tooltip, Avatar } from "@/shared/ui/primitives";
import LanguageSelector from "@/shared/ui/components/language-selector";
import { useHeaderActions } from "./hooks";
import { getHeaderActionConfig } from "@/shared/constants/header";
import type { HeaderComponentBaseProps } from "@/entities/header/types";

export function HeaderActions({ className = "" }: HeaderComponentBaseProps) {
  const {
    theme: { mounted, isDark, toggleTheme },
    user: { profile },
    authModals: { loginModal },
    actions: { handleUserAction },
    localization: { tHeader }
  } = useHeaderActions();

  const userName = profile?.fullName || profile?.email || "User";

  const UserBlock = profile ? (
    <Dropdown
      placement="bottom-end"
      ariaLabel={tHeader("userMenuLabel")}
      onAction={(k) => handleUserAction(k as string)}
      items={getHeaderActionConfig(userName, tHeader)}
    >
      <button className="flex items-center gap-3 outline-none transition-transform active:scale-95 group">
        <span className="max-w-[100px] truncate text-sm font-medium max-sm:hidden group-hover:text-primary">
          {userName}
        </span>
        <Avatar
          src={profile.avatarUrl || undefined}
          name={userName.substring(0, 2).toUpperCase()}
          classNames={{
            base: "w-8 h-8 rounded-full border-2 border-success bg-primary/10 text-primary group-hover:ring-2 group-hover:ring-primary/30 transition-all",
          }}
        />
      </button>
    </Dropdown>
  ) : (
    <Tooltip content={tHeader("login")} placement="bottom">
      <Button
        appVariant="icon-only"
        aria-label={tHeader("login")}
        onPress={loginModal.onOpen}
      >
        <LogIn size={16} />
      </Button>
    </Tooltip>
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {UserBlock}
      <LanguageSelector />
      <Tooltip content={tHeader("themeToggleLabel")} placement="bottom">
        <Button
          appVariant="icon-only"
          aria-label={tHeader("themeToggleLabel")}
          onPress={toggleTheme}
        >
          {mounted ? (isDark ? <Moon size={16} /> : <Sun size={16} />) : null}
        </Button>
      </Tooltip>
    </div>
  );
}
