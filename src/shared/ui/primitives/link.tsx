"use client";

import { forwardRef } from "react";
import { Link as HeroLinkBase, LinkProps as HeroLinkProps } from "@heroui/react";
import { Link as NextIntlLink } from "@/core/configs/i18n/routing";

export type AppLinkVariant = "nav-item" | "default";

export interface HeroLinkPropsWrapper extends Omit<HeroLinkProps, "as"> {
  appVariant?: AppLinkVariant;
  isActive?: boolean;
  href: string;
}

export const HeroLink = forwardRef<HTMLAnchorElement, HeroLinkPropsWrapper>(
  ({ appVariant = "default", className = "", isActive, href, children, ...props }, ref) => {
    let customClassName = "";

    if (appVariant === "nav-item") {
      customClassName = `text-medium whitespace-nowrap transition-colors uppercase tracking-wider ${
        isActive ? "font-normal text-primary" : "font-light text-foreground/80 hover:text-foreground"
      }`;
    }

    const finalClassName = `${customClassName} ${className}`.trim();

    return (
      <HeroLinkBase ref={ref} as={NextIntlLink} href={href} className={finalClassName} {...props}>
        {children}
      </HeroLinkBase>
    );
  }
);

HeroLink.displayName = "HeroLink";
