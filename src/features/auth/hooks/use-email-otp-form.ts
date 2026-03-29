"use client";

import { useState, useCallback, useMemo, useTransition } from "react";
import { OTP_FLOW_STEPS } from "@/features/auth/types";
import type { OtpFlowStep } from "@/features/auth/types";
import { OTP_CODE_LENGTH } from "@/features/auth/constants";
import { emailSchema } from "@/features/auth/validation";
import { formErrors } from "@/shared/constants/form";
import { requestEmailOtpAction, verifyEmailOtpAction } from "@/features/auth/actions";

// ─── Internal types (co-located — not feature-public) ────────────────────────

interface OtpSession {
  sentEmail: string;
  expiresAt: number; // ms timestamp
  isNewUser: boolean;
}

interface OtpErrors {
  email?: string;
  code?: string;
  fullName?: string;
  server?: string;
}

// ─── Hook contract ────────────────────────────────────────────────────────────

export interface UseEmailOtpFormReturn {
  step: OtpFlowStep;
  email: string;
  code: string;
  fullName: string;
  errors: OtpErrors;
  expiresAt: number | null;
  isNewUser: boolean;
  canRequestCode: boolean;
  canSubmit: boolean;
  isPending: boolean;
  handleEmailChange: (value: string) => void;
  handleEmailBlur: () => void;
  handleCodeChange: (value: string) => void;
  handleFullNameChange: (value: string) => void;
  handleRequestCode: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
  handleTimerExpired: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useEmailOtpForm — passwordless email OTP auth flow.
 *
 * Keeps it simple: useState per field, useTransition for async network requests.
 * React handles concurrent UI updates without manual PENDING flags.
 *
 * Smart resend: same email + session still valid → skip API, slide OTP back in.
 */
export function useEmailOtpForm(onSuccess?: () => void): UseEmailOtpFormReturn {
  const [step, setStep] = useState<OtpFlowStep>(OTP_FLOW_STEPS.IDLE);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<OtpErrors>({});
  const [session, setSession] = useState<OtpSession | null>(null);
  const [isPending, startTransition] = useTransition();

  const isNewUser = session?.isNewUser ?? false;
  const expiresAt = session?.expiresAt ?? null;

  // ── Derived ───────────────────────────────────────────────────────────────

  const canRequestCode = useMemo(
    () => step === OTP_FLOW_STEPS.IDLE && emailSchema.safeParse(email).success,
    [step, email],
  );

  const canSubmit = useMemo(() => {
    if (step !== OTP_FLOW_STEPS.CODE_SENT) return false;
    if (code.length !== OTP_CODE_LENGTH) return false;
    if (isNewUser && fullName.trim().length === 0) return false;
    // expiry handled by CountdownTimer.onExpired → handleTimerExpired
    return true;
  }, [step, code, fullName, isNewUser]);

  // ── Field handlers ────────────────────────────────────────────────────────

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setErrors(prev => ({ ...prev, email: undefined }));
  }, []);

  const handleEmailBlur = useCallback(() => {
    if (email.length === 0) return;
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setErrors(prev => ({ ...prev, email: result.error.issues[0]?.message ?? formErrors.emailInvalid }));
    }
  }, [email]);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    setErrors(prev => ({ ...prev, code: undefined }));
  }, []);

  const handleFullNameChange = useCallback((value: string) => {
    setFullName(value);
    setErrors(prev => ({ ...prev, fullName: undefined }));
  }, []);

  const handleBack = useCallback(() => {
    setStep(OTP_FLOW_STEPS.IDLE);
    setCode("");
    setErrors({});
    // session preserved — smart resend cache
  }, []);

  const handleTimerExpired = useCallback(() => {
    setStep(OTP_FLOW_STEPS.IDLE);
    setSession(null);
    setCode("");
    setErrors({});
  }, []);

  // ── Async handlers ─────────────────────────────────────────────────────────

  const handleRequestCode = useCallback(() => {
    if (!canRequestCode) return;

    // Smart cache: same email + still valid → slide OTP back in, no API call
    if (session !== null && email === session.sentEmail && session.expiresAt > Date.now()) {
      setStep(OTP_FLOW_STEPS.CODE_SENT);
      setCode("");
      setErrors({});
      return;
    }

    startTransition(async () => {
      setErrors({});
      const result = await requestEmailOtpAction(email);

      if (!result.success || result.expiresIn === undefined || result.isNewUser === undefined) {
        setErrors({ server: result.error ?? "Request failed" });
        return;
      }

      setSession({ sentEmail: email, expiresAt: Date.now() + result.expiresIn * 1000, isNewUser: result.isNewUser });
      setStep(OTP_FLOW_STEPS.CODE_SENT);
      setCode("");
    });
  }, [canRequestCode, email, session]);

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;

    startTransition(async () => {
      setErrors({});
      const result = await verifyEmailOtpAction({
        email,
        code,
        ...(isNewUser && fullName.trim() ? { fullName: fullName.trim() } : {}),
      });

      if (!result.success) {
        setErrors({ server: result.error ?? "Verification failed" });
        return;
      }

      onSuccess?.();
    });
  }, [canSubmit, email, code, fullName, isNewUser, onSuccess]);

  return {
    step, email, code, fullName, errors, expiresAt, isNewUser,
    canRequestCode, canSubmit, isPending,
    handleEmailChange, handleEmailBlur, handleCodeChange, handleFullNameChange,
    handleRequestCode, handleBack, handleSubmit, handleTimerExpired,
  };
}

