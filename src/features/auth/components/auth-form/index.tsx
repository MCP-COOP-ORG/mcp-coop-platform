"use client";

import { Form, Button, Input } from "@/shared/ui/components/hero-ui";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { useModal } from "@/shared/ui/components/modal";
import { ArrowRight } from "lucide-react";

import { OTP_FLOW_STEPS } from "@/features/auth/types";
import { useEmailOtpForm } from "@/features/auth/hooks/use-email-otp-form";
import { useTelegramActionController } from "@/features/auth/hooks/use-telegram";
import { telegramAuthAction } from "@/features/auth/actions";
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

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const fadeTransition: Transition = { duration: 0.1, ease: "easeInOut" };

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AuthForm — thin presenter.
 * All logic delegated to useEmailOtpForm.
 */
export default function AuthForm({ onSuccess }: AuthFormProps) {
  const t = useTranslations("Form");
  const { isOpen, onOpen, onClose, onOpenChange } = useModal();
  const { execute: handleLogin, isPending: isTelegramPending } = useTelegramActionController({
    action: telegramAuthAction,
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
      <div className="relative grid grid-cols-1 grid-rows-1 w-full items-start overflow-hidden rounded-xl">

        {/* Base layer: Email + Send Button */}
        <div className="col-start-1 row-start-1 flex w-full items-center gap-2">
          <div className="flex-1">
            <EmailInputRow
              value={email}
              error={errors.email}
              isDisabled={isPending}
              onValueChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            isIconOnly
            isLoading={isPending && !isOtpStep}
            isDisabled={!canRequestCode || isPending}
            className="shrink-0 h-[44px] w-[44px] rounded-xl data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
            aria-label={t("sendCode")}
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* Overlay layer: OTP + Verify Button slides OVER the base layer */}
        <AnimatePresence>
          {isOtpStep && (
            <motion.div
              key="otp-overlay"
              className="col-start-1 row-start-1 flex w-full items-center justify-between bg-background z-10"
              variants={fadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={fadeTransition}
            >
              <OtpInputRow
                code={code}
                expiresAt={expiresAt!}
                error={errors.code}
                isDisabled={isPending}
                onCodeChange={handleCodeChange}
                onBack={handleBack}
                onExpired={handleTimerExpired}
              >
                <Button
                  type="submit"
                  color="primary"
                  isIconOnly
                  isLoading={isPending && isOtpStep}
                  isDisabled={!canSubmit || isPending}
                  className="shrink-0 h-[44px] w-[44px] rounded-xl data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
                  aria-label={t("verify")}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>
              </OtpInputRow>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── New user: fullName (fade-in) ─────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOtpStep && isNewUser && (
          <motion.div
            key="fullname"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden w-full"
          >
            <div className="pt-3 pb-1 w-full">
              <Input
                id="auth-full-name"
                size="sm"
                type="text"
                autoComplete="name"
                label={t(authFormFields.name.label)}
                placeholder={t(authFormFields.name.placeholder)}
                value={fullName}
                onValueChange={handleFullNameChange}
                isDisabled={isPending}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName ? t(errors.fullName as Parameters<typeof t>[0]) : undefined}
                classNames={{
                  base: "w-full",
                  inputWrapper: "w-full transition-all duration-200 h-[44px] min-h-[44px]",
                }}
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
