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
  onCodeChange: (value: string) => void;
  onBack: () => void;
  onExpired: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * OtpInputRow — renders [CountdownTimer | InputOtp].
 * Single responsibility: display only. No state, no logic.
 * OTP_CODE_LENGTH imported from constants — no magic numbers.
 */
export function OtpInputRow({
  code,
  expiresAt,
  error,
  onCodeChange,
  onBack,
  onExpired,
}: OtpInputRowProps) {
  const t = useTranslations("Form");

  return (
    <div className="flex items-center gap-3 w-full">
      <CountdownTimer
        expiresAt={expiresAt}
        onBack={onBack}
        onExpired={onExpired}
      />
      <div className="flex-1">
        <InputOtp
          length={OTP_CODE_LENGTH}
          size="sm"
          value={code}
          onValueChange={onCodeChange}
          isInvalid={!!error}
          errorMessage={error ? t(error as Parameters<typeof t>[0]) : undefined}
          autoFocus
          classNames={{
            base: "w-full",
            segmentWrapper: "gap-2",
            segment: [
              "text-lg font-semibold rounded-lg border-2 transition-all duration-150",
              "data-[active=true]:border-primary",
              error ? "border-danger" : "border-default-300",
            ].join(" "),
          }}
        />
      </div>
    </div>
  );
}
