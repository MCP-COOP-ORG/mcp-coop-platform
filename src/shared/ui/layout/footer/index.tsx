import React from "react";
import { Link } from "@/core/configs/i18n/routing";
import { useTranslations } from "next-intl";
import { navigationRoutes } from "@/shared/constants/header";
import { footerTexts, footerCopyrightYear } from "@/shared/constants/footer";

const Footer: React.FC = () => {
  const navT = useTranslations("Navigation");

  return (
    <footer className="border-t border-neutral-800 bg-gradient-to-b from-white/10 via-transparent to-transparent">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <p className="text-xs">
          {footerTexts.copyrightPrefix} {footerCopyrightYear}{" "}
          {footerTexts.projectName}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={navigationRoutes.contacts.href}
            className="text-sm text-default-600 hover:text-default-900 transition-colors"
          >
            {navT(navigationRoutes.contacts.translationKey as never)}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

