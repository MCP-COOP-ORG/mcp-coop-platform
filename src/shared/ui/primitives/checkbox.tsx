"use client";

import { forwardRef } from "react";
import {
  Checkbox as HeroCheckbox,
  CheckboxGroup as HeroCheckboxGroup,
  CheckboxProps as HeroCheckboxProps,
  CheckboxGroupProps as HeroCheckboxGroupProps,
} from "@heroui/react";

export type AppCheckboxVariant = "default";

export interface CheckboxProps extends HeroCheckboxProps {
  appVariant?: AppCheckboxVariant;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroCheckbox ref={ref} className={className} {...props} />;
  }
);
Checkbox.displayName = "Checkbox";

export interface CheckboxGroupProps extends HeroCheckboxGroupProps {
  appVariant?: AppCheckboxVariant;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroCheckboxGroup ref={ref} className={className} {...props} />;
  }
);
CheckboxGroup.displayName = "CheckboxGroup";
