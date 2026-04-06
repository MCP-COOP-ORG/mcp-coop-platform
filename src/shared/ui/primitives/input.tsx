"use client";

import { forwardRef } from "react";
import {
  Input as HeroInput,
  Textarea as HeroTextarea,
  InputProps as HeroInputProps,
  TextAreaProps as HeroTextAreaProps,
} from "@heroui/react";
import { InputOtp as HeroInputOtp, InputOtpProps as HeroInputOtpProps } from "@heroui/input-otp";

export type AppInputVariant = "default" | "auth" | "bordered" | "underlined";

export interface InputProps extends Omit<HeroInputProps, "variant" | "classNames"> {
  appVariant?: AppInputVariant;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ appVariant = "default", className = "", ...props }, ref) => {
    let mappedProps: Partial<HeroInputProps> = {};
    let customClassNames: HeroInputProps["classNames"] = {};

    switch (appVariant) {
      case "auth":
        mappedProps = { variant: "flat", radius: "md" };
        customClassNames = {
          base: "w-full",
          inputWrapper: "w-full transition-all duration-200 h-[44px] min-h-[44px]",
        };
        break;
      case "bordered":
        mappedProps = { variant: "bordered", radius: "md" };
        break;
      case "underlined":
        mappedProps = { variant: "underlined" };
        break;
      default:
        mappedProps = { variant: "flat", radius: "md" };
        break;
    }

    return (
      <HeroInput
        ref={ref}
        className={className}
        classNames={customClassNames}
        {...mappedProps}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends Omit<HeroTextAreaProps, "variant" | "classNames"> {
  appVariant?: AppInputVariant;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ appVariant = "default", className = "", ...props }, ref) => {
    let mappedProps: Partial<HeroTextAreaProps> = {};

    switch (appVariant) {
      case "bordered":
        mappedProps = { variant: "bordered", radius: "md" };
        break;
      case "underlined":
        mappedProps = { variant: "underlined" };
        break;
      default:
        mappedProps = { variant: "flat", radius: "md" };
        break;
    }

    return <HeroTextarea ref={ref} className={className} {...mappedProps} {...props} />;
  }
);
Textarea.displayName = "Textarea";

export interface InputOtpProps extends Omit<HeroInputOtpProps, "variant" | "classNames"> {
  appVariant?: AppInputVariant;
}

export const InputOtp = forwardRef<HTMLInputElement, InputOtpProps>(
  ({ appVariant = "default", className = "", ...props }, ref) => {
    let mappedProps: Partial<HeroInputOtpProps> = {};
    let customClassNames: HeroInputOtpProps["classNames"] = {};

    switch (appVariant) {
      case "auth":
        mappedProps = { variant: "bordered", radius: "sm" };
        customClassNames = {
          base: "shrink-0 !w-auto",
          segmentWrapper: "gap-2",
          segment: [
            "!h-[44px] !w-[44px] text-lg font-semibold rounded-xl border-2 transition-all duration-150",
            "data-[active=true]:border-primary",
            props.isInvalid ? "border-danger" : "border-default-200",
          ].join(" "),
        };
        break;
      case "bordered":
        mappedProps = { variant: "bordered", radius: "md" };
        break;
      case "underlined":
        mappedProps = { variant: "underlined" };
        break;
      default:
        mappedProps = { variant: "flat", radius: "md" };
        break;
    }

    return (
      <HeroInputOtp
        ref={ref}
        className={className}
        classNames={customClassNames}
        {...mappedProps}
        {...props}
      />
    );
  }
);
InputOtp.displayName = "InputOtp";
