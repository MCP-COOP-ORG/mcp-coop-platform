"use client";

import { InputOtp } from "@/shared/ui/primitives";
import { CountdownTimer } from "@/features/auth/components/countdown-timer";
import { OTP_CODE_LENGTH } from "@/features/auth/constants";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OtpInputRowProps {
  code: string;
  expiresAt: number;
  error?: string;
  isDisabled?: boolean;
  onCodeChange: (value: string) => void;
  onBack: () => void;
  onExpired: () => void;
  children?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OtpInputRow({
  code,
  expiresAt,
  error,
  onCodeChange,
  onBack,
  onExpired,
  isDisabled = false,
  children,
}: OtpInputRowProps) {
  const t = useTranslations("Form");

  return (
    <>
      <CountdownTimer
        expiresAt={expiresAt}
        onBack={onBack}
        onExpired={onExpired}
        isDisabled={isDisabled}
      />
      <InputOtp
        length={OTP_CODE_LENGTH}
        value={code}
        onValueChange={onCodeChange}
        isDisabled={isDisabled}
        isInvalid={!!error}
        errorMessage={error ? t(error as Parameters<typeof t>[0]) : undefined}
        appVariant="auth"
      />
      {children}
    </>
  );
}
