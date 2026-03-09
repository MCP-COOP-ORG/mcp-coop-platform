"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { Session } from "next-auth";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function Providers({ children, session }: ProvidersProps) {
  const router = useRouter();

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
