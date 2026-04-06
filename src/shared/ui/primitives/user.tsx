"use client";

import { forwardRef } from "react";
import { User as HeroUser, UserProps as HeroUserProps } from "@heroui/react";
import { UserIcon } from "lucide-react";

export type AppUserVariant = "header-profile" | "default";

export interface UserProps extends Omit<HeroUserProps, "classNames" | "avatarProps"> {
  appVariant?: AppUserVariant;
  avatarUrl?: string | null;
}

export const User = forwardRef<HTMLDivElement, UserProps>(
  ({ appVariant = "default", className = "", avatarUrl, name, ...props }, ref) => {
    let customClassNames: HeroUserProps["classNames"] = {};
    let avatarProps: HeroUserProps["avatarProps"] = { src: avatarUrl || undefined };

    if (appVariant === "header-profile") {
      customClassNames = {
        base: "flex-row-reverse gap-3",
        name: "max-w-[100px] truncate block font-medium",
      };
      avatarProps = {
        ...avatarProps,
        radius: "md",
        className:
          "w-10 h-10 min-w-10 min-h-10 border-2 border-success box-border bg-primary/80 text-primary-foreground transition-transform cursor-pointer",
        icon: <UserIcon size={20} />,
      };
    }

    const finalClassName = `${
      appVariant === "header-profile" ? "transition-transform outline-none" : ""
    } ${className}`.trim();

    return (
      <HeroUser
        ref={ref}
        className={finalClassName}
        classNames={customClassNames}
        avatarProps={avatarProps}
        name={name}
        {...props}
      />
    );
  }
);

User.displayName = "User";
