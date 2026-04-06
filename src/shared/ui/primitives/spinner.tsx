"use client";

import { forwardRef } from "react";
import { Spinner as HeroSpinner, SpinnerProps as HeroSpinnerProps } from "@heroui/react";

export type AppSpinnerVariant = "default";

export interface SpinnerProps extends HeroSpinnerProps {
  appVariant?: AppSpinnerVariant;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroSpinner ref={ref} className={className} {...props} />;
  }
);
Spinner.displayName = "Spinner";
