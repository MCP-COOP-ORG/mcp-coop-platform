import { useState, useEffect } from "react";
import { usePathname } from "@/core/configs/i18n/routing";

export function useHeaderState() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Автоматически закрываем мобильное меню при смене страницы (derived state pattern)
  if (pathname !== prevPathname) {
    setIsMenuOpen(false);
    setPrevPathname(pathname);
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  };
}
