"use client";

import { motion } from "framer-motion";
import { HeroLink } from "@/shared/ui/primitives";
import { HeaderActions } from "./header-actions";
import { useHeaderNavigation } from "./hooks";
import type { HeaderMobileMenuProps } from "@/entities/header/types";

export function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  const { links } = useHeaderNavigation();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "calc(100dvh - 61px)", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed top-[61px] left-0 w-full bg-background/95 backdrop-blur-xl border-b border-divider z-[9998] lg:hidden overflow-hidden flex flex-col"
    >
      <div className="px-6 pt-0 pb-4 flex flex-col gap-8 flex-1 overflow-y-auto">
        <div className="flex justify-end py-3 mb-2 border-b border-dashed border-divider/50">
          <HeaderActions className="flex" />
        </div>

        <nav className="flex flex-col gap-6 antialiased">
          {links.map((link) => {
            if (link.children) {
              return (
                <div key={link.key} className="flex flex-col gap-3">
                  <span
                    className={`text-[18px] transition-colors ${link.isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {link.label}
                  </span>
                  <div className="flex flex-col gap-3 pl-4">
                    {link.children.map((child) => (
                      <HeroLink
                        key={child.key}
                        href={child.href!}
                        appVariant="nav-item"
                        isActive={child.isActive}
                        className={`text-[14px] transition-colors ${child.isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
                        onClick={onClose}
                      >
                        {child.label}
                      </HeroLink>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <HeroLink
                key={link.key}
                href={link.href!}
                appVariant="nav-item"
                isActive={link.isActive}
                className={`text-[18px] transition-colors ${link.isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
                onClick={onClose}
              >
                {link.label}
              </HeroLink>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}
