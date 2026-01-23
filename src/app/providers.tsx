"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import type { Session } from "next-auth";

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function Providers({ children, session }: ProvidersProps) {
  const router = useRouter();
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <SessionContext.Provider value={{ session }}>
          {children}
        </SessionContext.Provider>
      </ThemeContext.Provider>
    </HeroUIProvider>
  );
}

const ThemeContext = React.createContext<{
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}>({
  isDark: true,
  setIsDark: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

const SessionContext = React.createContext<{
  session: Session | null;
}>({
  session: null,
});

export function useSession() {
  return React.useContext(SessionContext);
}

