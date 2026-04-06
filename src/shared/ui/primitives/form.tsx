"use client";

import { forwardRef } from "react";
import { Form as HeroForm, FormProps as HeroFormProps } from "@heroui/react";

export type AppFormVariant = "default";

export interface FormProps extends HeroFormProps {
  appVariant?: AppFormVariant;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroForm ref={ref} className={className} {...props} />;
  }
);

Form.displayName = "Form";
