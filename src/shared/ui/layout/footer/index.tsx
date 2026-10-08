"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { HeroLink } from "@/shared/ui/primitives";
import { navigationRoutes } from "@/shared/constants/header";
import { APP_INFO } from "@/shared/constants/app-info";

const Footer: React.FC = () => {
  // const navT = useTranslations("Navigation");

  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center px-[20px] py-6 text-center">
        <p className="text-[15px] text-foreground/75">
          {APP_INFO.copyright}
        </p>

        {/* CONTACTS LINK COMMENTED OUT:
        <div className="flex items-center gap-4">
          <HeroLink
            href={navigationRoutes.contacts.href}
            color="foreground"
            className="text-[15px] uppercase transition-colors"
          >
            {navT(navigationRoutes.contacts.translationKey as never)}
          </HeroLink>
        </div>
        */}
      </div>
    </footer>
  );
};

export default Footer;

