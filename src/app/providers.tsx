"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
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
        {children}
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

