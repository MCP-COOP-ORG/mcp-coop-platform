"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { Session } from "next-auth";
import { logout } from "@/features/auth/actions/auth.actions";
import { APP_EVENTS } from "@/shared/constants/events";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

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
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionContext.Provider value={{ session }}>
          {children}
        </SessionContext.Provider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

const SessionContext = React.createContext<{
  session: Session | null;
}>({
  session: null,
});

export function useSession() {
  return React.useContext(SessionContext);
}
