import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/configs/i18n/routing";
import { useSession } from "@/shared/hooks/use-session";
import { logout } from "@/features/auth/actions";
import { THEME } from "@/shared/constants/theme";
import { PROFILE_ACTION_KEYS } from "@/shared/constants/header";
import { useAuthModals } from "@/features/auth/context/auth-modals-context";

export function useHeaderActions() {
  const tHeader = useTranslations("Header");
  const { theme, setTheme } = useTheme();
  const session = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const isDark = theme === THEME.dark;
  const toggleTheme = () => setTheme(isDark ? THEME.light : THEME.dark);

  const authModals = useAuthModals();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) router.refresh();
  };

  const handleUserAction = (key: string) => {
    if (key === PROFILE_ACTION_KEYS.LOGOUT) handleLogout();
    if (key === PROFILE_ACTION_KEYS.LINK_TELEGRAM) authModals.telegramModal.onOpen();
  };

  return {
    theme: {
      mounted,
      isDark,
      toggleTheme,
    },
    user: {
      profile: session.myProfile,
    },
    authModals,
    actions: {
      handleUserAction,
    },
    localization: {
      tHeader
    }
  };
}
