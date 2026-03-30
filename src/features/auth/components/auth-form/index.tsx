"use client";

import { Form, Button, Input } from "@/shared/ui/components/hero-ui";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { useModal } from "@/shared/ui/components/modal";
import { ArrowRight } from "lucide-react";

import { OTP_FLOW_STEPS } from "@/features/auth/types";
import { useEmailOtpForm } from "@/features/auth/hooks/use-email-otp-form";
import { useTelegramActionController } from "@/features/auth/hooks/use-telegram";
import { loginWithTelegramAction } from "@/features/auth/actions";
import { authFormFields } from "@/shared/constants/form";

import { EmailInputRow } from "./email-input-row";
import { OtpInputRow } from "./otp-input-row";
import { OAuthButtonGroup } from "./oauth-button-group";
import { TelegramAuthModal } from "@/features/auth/components/telegram-auth-modal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthFormProps {
  onSuccess?: () => void;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
};

const slideTransition: Transition = { duration: 0.28, ease: "easeInOut" };

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AuthForm — thin presenter.
 * All logic delegated to useEmailOtpForm.
 */
export default function AuthForm({ onSuccess }: AuthFormProps) {
  const t = useTranslations("Form");
  const { isOpen, onOpen, onClose, onOpenChange } = useModal();
  const { execute: handleLogin, isPending: isTelegramPending } = useTelegramActionController({
    action: loginWithTelegramAction,
  });

  const {
    step,
    email,
    code,
    fullName,
    errors,
    expiresAt,
    isNewUser,
    canRequestCode,
    canSubmit,
    isPending,
    handleEmailChange,
    handleEmailBlur,
    handleCodeChange,
    handleFullNameChange,
    handleRequestCode,
    handleBack,
    handleSubmit,
    handleTimerExpired,
  } = useEmailOtpForm(onSuccess);

  const isOtpStep = step === OTP_FLOW_STEPS.CODE_SENT;
  const slideDirection = isOtpStep ? 1 : -1;

  const handleTelegramAuth = async (initData: string) => {
    const res = await handleLogin(initData);
    if (res?.success) { onClose(); onSuccess?.(); }
    return res;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOtpStep) handleRequestCode();
    else handleSubmit();
  };

  return (
    <Form
      className="w-full flex flex-col gap-5"
      validationBehavior="aria"
      onSubmit={handleFormSubmit}
    >
      {/* ── Input row: email ↔ OTP + Send/Verify button ─────────────────── */}
      <div className="flex w-full items-start gap-2">

        {/* Left: animated email ↔ OTP */}
        <div className="flex-1 grid grid-cols-1 grid-rows-1 items-start overflow-hidden">
          <AnimatePresence initial={false} custom={slideDirection}>
            {!isOtpStep ? (
              <motion.div
                key="email"
                className="col-start-1 row-start-1 w-full"
                custom={-slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                <EmailInputRow
                  value={email}
                  error={errors.email}
                  isDisabled={isPending}
                  onValueChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                className="col-start-1 row-start-1 w-full"
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                <OtpInputRow
                  code={code}
                  expiresAt={expiresAt!}
                  error={errors.code}
                  onCodeChange={handleCodeChange}
                  onBack={handleBack}
                  onExpired={handleTimerExpired}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: fixed action button */}
        <Button
          type="submit"
          color="primary"
          isIconOnly
          isLoading={isPending}
          isDisabled={isOtpStep ? !canSubmit || isPending : !canRequestCode || isPending}
          className="shrink-0 h-[44px] w-[44px] rounded-xl data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
          aria-label={isOtpStep ? t("verify") : t("sendCode")}
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* ── New user: fullName (fade-in) ─────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOtpStep && isNewUser && (
          <motion.div
            key="fullname"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1 px-1">
              <Input
                id="auth-full-name"
                type="text"
                autoComplete="name"
                label={t(authFormFields.name.label)}
                placeholder={t(authFormFields.name.placeholder)}
                description="Это ваш первый вход с данным email. Представьтесь, пожалуйста, чтобы завершить регистрацию."
                value={fullName}
                onValueChange={handleFullNameChange}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName ? t(errors.fullName as Parameters<typeof t>[0]) : undefined}
                isRequired
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Server error ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {errors.server && (
          <motion.div
            key="server-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="alert"
            className="text-danger bg-danger/5 text-sm font-medium p-3 border border-danger/20 rounded-lg"
          >
            {t(errors.server as Parameters<typeof t>[0]) || errors.server}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OAuth — block with equal padding and top shadow ─────────────── */}
      <div className="flex justify-center w-full pt-2 mt-2 border-t border-divider">
        <OAuthButtonGroup isDisabled={isPending} onTelegramOpen={onOpen} />
      </div>

      {/* ── Telegram Modal ───────────────────────────────────────────────── */}
      <TelegramAuthModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={t("loginWithTelegram")}
        onAuth={handleTelegramAuth}
        isPending={isTelegramPending}
      />
    </Form>
  );
}
