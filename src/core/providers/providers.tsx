"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppSession } from "@/shared/types/auth";
import { logout } from "@/features/auth/actions/auth.actions";
import { APP_EVENTS } from "@/shared/constants/events";
import { SessionProvider } from "@/shared/hooks/use-session";
import { THEME } from "@/shared/constants/theme";

interface ProvidersProps {
  children: React.ReactNode;
  session: AppSession;
}

export function Providers({ children, session }: ProvidersProps) {
  const router = useRouter();

  React.useEffect(() => {
    const handleAuthFail = async () => {
      console.warn("MFE reported auth failure. Forcing logout on Platform.");
      const result = await logout();
      if (result.success) {
        router.refresh();
      }
    };

    window.addEventListener(APP_EVENTS.AUTH_FAILED, handleAuthFail);
    return () => window.removeEventListener(APP_EVENTS.AUTH_FAILED, handleAuthFail);
  }, [router]);

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme={THEME.light}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
