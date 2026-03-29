"use client";

import { useTransition } from "react";
import { Form, Button } from "@/shared/ui/components/hero-ui";
import {
  authFormFields,
  authFormButtons,
  authFormModes,
  type AuthFormMode,
} from "@/shared/constants/form";
import { useTranslations } from "next-intl";
import { useAuthForm } from "@/features/auth/hooks/use-auth-form";
import { FormFieldRenderer } from "@/shared/ui/components/form-field-renderer";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, GoogleIcon, TelegramIcon } from "@/shared/ui/icons/social";
import { oauthLogin } from "@/features/auth/actions";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/features/auth/constants";
import { TelegramAuthModal } from "@/features/auth/components/telegram-auth-modal";
import { useTelegramLoginController } from "@/features/auth/hooks/use-telegram";
import { useModal } from "@/shared/ui/components/modal";

interface AuthFormProps {
  mode: AuthFormMode;
  onModeChange?: (mode: AuthFormMode) => void;
  onSuccess?: () => void;
}

export default function AuthForm({
  mode,
  onModeChange,
  onSuccess,
}: AuthFormProps) {
  const t = useTranslations("Form");
  const { formData, errors, serverError, isPending, handleInputChange, handleSubmit } = useAuthForm(mode, onSuccess);
  const [isOAuthPending, startOAuthTransition] = useTransition();
  const { handleLogin, isPending: isTelegramPending } = useTelegramLoginController();
  const { isOpen, onOpen, onClose, onOpenChange } = useModal();

  const handleTelegramAuth = async (initData: string) => {
    const res = await handleLogin(initData);
    if (res?.success) {
      onClose();
      if (onSuccess) onSuccess();
    }
    return res;
  };

  const handleModeSwitch = () => {
    if (onModeChange) {
      onModeChange(mode === authFormModes.login ? authFormModes.signup : authFormModes.login);
    }
  };

  const handleOAuthLogin = (provider: OAuthProvider) => {
    startOAuthTransition(() => {
      oauthLogin(provider);
    });
  };

  return (
    <Form
      className="w-full flex flex-col gap-4"
      validationBehavior="aria"
      onSubmit={handleSubmit}
    >
      <FormFieldRenderer
        field={authFormFields.email}
        value={formData.email}
        t={t}
        onValueChange={handleInputChange(authFormFields.email.name)}
        error={errors.email}
      />

      <AnimatePresence initial={false}>
        {mode === authFormModes.signup && (
          <motion.div
            key="name-field"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <div className="pb-1">
              <FormFieldRenderer
                field={authFormFields.name}
                value={formData.name || ""}
                t={t}
                onValueChange={handleInputChange(authFormFields.name.name)}
                error={errors.name}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FormFieldRenderer
        field={authFormFields.password}
        value={formData.password}
        t={t}
        onValueChange={handleInputChange(authFormFields.password.name)}
        error={errors.password}
      />

      <AnimatePresence initial={false}>
        {mode === authFormModes.signup && (
          <motion.div
            key="confirm-password-field"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <div className="pb-1">
              <FormFieldRenderer
                field={authFormFields.confirmPassword}
                value={formData.confirmPassword || ""}
                t={t}
                onValueChange={handleInputChange(authFormFields.confirmPassword.name)}
                error={errors.confirmPassword}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {serverError && (
        <div
          role="alert"
          className="text-danger bg-danger/5 w-full text-sm font-medium p-3 border border-danger/20 rounded-lg"
        >
          {serverError}
        </div>
      )}

      <div className="flex flex-col gap-2 w-full mt-2">
        <div className="flex w-full gap-2 mb-2">
          {/* Social Provider Buttons */}
          <div className="flex gap-2">
            <Button
              isIconOnly
              radius="full"
              variant="bordered"
              onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GITHUB)}
              isDisabled={isPending || isOAuthPending}
              aria-label={t(authFormButtons.loginWithGithub)}
            >
              <GithubIcon className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="bordered"
              onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GOOGLE)}
              isDisabled={isPending || isOAuthPending}
              aria-label={t(authFormButtons.loginWithGoogle)}
            >
              <GoogleIcon className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="bordered"
              onPress={onOpen}
              isDisabled={isPending || isOAuthPending}
              aria-label={t(authFormButtons.loginWithTelegram)}
            >
              <TelegramIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <Button
            type="submit"
            color="primary"
            isLoading={isPending}
            isDisabled={isPending || isOAuthPending}
            className="flex-1"
          >
            {mode === authFormModes.login ? t(authFormButtons.login) : t(authFormButtons.signup)}
          </Button>
        </div>

        {onModeChange && (
          <Button
            type="button"
            variant="light"
            onPress={handleModeSwitch}
            className="w-full"
          >
            {mode === authFormModes.login
              ? t(authFormButtons.switchToSignup)
              : t(authFormButtons.switchToLogin)}
          </Button>
        )}
      </div>

      <TelegramAuthModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        title={t(authFormButtons.loginWithTelegram)} 
        onAuth={handleTelegramAuth} 
        isPending={isTelegramPending} 
      />
    </Form>
  );
}