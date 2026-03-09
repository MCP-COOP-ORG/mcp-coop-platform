import React from "react";

import { footerTexts, footerCopyrightYear } from "@/shared/constants/footer";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-gradient-to-b from-white/10 via-transparent to-transparent">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-start px-4 py-3">
        <p className="text-xs">
          {footerTexts.copyrightPrefix} {footerCopyrightYear}{" "}
          {footerTexts.projectName}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

