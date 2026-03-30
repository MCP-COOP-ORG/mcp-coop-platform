"use client";

import { InputOtp } from "@/shared/ui/components/hero-ui";
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
        variant="bordered"
        classNames={{
          base: "shrink-0 !w-auto",
          segmentWrapper: "gap-2",
          segment: [
            "!h-[44px] !w-[44px] text-lg font-semibold rounded-xl border-2 transition-all duration-150",
            "data-[active=true]:border-primary",
            error ? "border-danger" : "border-default-200",
          ].join(" "),
        }}
      />
      {children}
    </>
  );
}
