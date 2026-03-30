"use client";

import { Input } from "@/shared/ui/components/hero-ui";
import { useTranslations } from "next-intl";
import { authFormFields } from "@/shared/constants/form";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailInputRowProps {
  value: string;
  error?: string;
  isDisabled?: boolean;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * EmailInputRow — renders only the email input.
 * No knowledge of OTP flow, state machine, or actions (SRP).
 */
export function EmailInputRow({
  value,
  error,
  isDisabled = false,
  onValueChange,
  onBlur,
}: EmailInputRowProps) {
  const t = useTranslations("Form");

  // error can be an i18n key or already translated string
  const translatedError = error ? t(error as Parameters<typeof t>[0]) : undefined;

  return (
    <Input
      id="auth-email"
      type="email"
      size="sm"
      autoComplete="email"
      label={t(authFormFields.email.label)}
      placeholder={t(authFormFields.email.placeholder)}
      value={value}
      onValueChange={onValueChange}
      onBlur={onBlur}
      isDisabled={isDisabled}
      isInvalid={!!error}
      errorMessage={translatedError || error}
      isRequired
      classNames={{
        inputWrapper: "transition-all duration-200 h-[44px] min-h-[44px]",
      }}
    />
  );
}
