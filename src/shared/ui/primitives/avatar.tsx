"use client";

import { forwardRef } from "react";
import { Avatar as HeroAvatar, AvatarGroup as HeroAvatarGroup, AvatarProps as HeroAvatarProps } from "@heroui/react";

export type AppAvatarVariant = "default";

export interface AvatarProps extends HeroAvatarProps {
  appVariant?: AppAvatarVariant;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroAvatar ref={ref} className={className} {...props} />;
  }
);
Avatar.displayName = "Avatar";

export const AvatarGroup = HeroAvatarGroup;
