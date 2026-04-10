"use client";

import { useTranslations } from "next-intl";
import { headerI18nKeys } from "@/shared/constants/header";
import { AnimatePresence } from "framer-motion";
import { useHeaderState } from "./hooks";
import { HeaderLogo } from "./header-logo";
import { HeaderNav } from "./header-nav";
import { HeaderActions } from "./header-actions";
import { HeaderMobileMenu } from "./header-mobile-menu";

export function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useHeaderState();
  const headerT = useTranslations("Header");

  return (
    <header className="w-full px-4 py-0 lg:p-[20px] sticky top-0 lg:relative lg:top-auto bg-background/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none z-[9999] border-b border-dashed border-divider/50 lg:border-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[60px]">
        <HeaderLogo />
        <HeaderNav className="max-lg:hidden" />

        <div className="flex items-center gap-2">
          <HeaderActions className="max-lg:hidden" />

          <button
            type="button"
            className="lg:hidden flex group items-center justify-center w-8 h-8 rounded-small outline-none focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 tap-highlight-transparent"
            aria-label={isMenuOpen ? headerT(headerI18nKeys.closeMenu) : headerT(headerI18nKeys.openMenu)}
            aria-expanded={isMenuOpen}
            data-open={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">
              {isMenuOpen ? headerT(headerI18nKeys.closeMenu) : headerT(headerI18nKeys.openMenu)}
            </span>
            <span
              className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit transition-opacity before:content-[''] before:block before:h-px before:w-6 before:bg-current before:transition-transform before:duration-150 before:-translate-y-1 before:rotate-0 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:transition-transform after:duration-150 after:translate-y-1 after:rotate-0 group-data-[open=true]:before:translate-y-px group-data-[open=true]:before:rotate-45 group-data-[open=true]:after:translate-y-0 group-data-[open=true]:after:-rotate-45"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <AnimatePresence>
        <HeaderMobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </AnimatePresence>
    </header>
  );
}
