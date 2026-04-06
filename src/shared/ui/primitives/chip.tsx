"use client";

import { forwardRef } from "react";
import { Chip as HeroChip, ChipProps as HeroChipProps } from "@heroui/react";

export type AppChipVariant = "default";

export interface ChipProps extends HeroChipProps {
  appVariant?: AppChipVariant;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroChip ref={ref} className={className} {...props} />;
  }
);
Chip.displayName = "Chip";
