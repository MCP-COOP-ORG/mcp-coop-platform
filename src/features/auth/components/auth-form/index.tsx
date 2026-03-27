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
import { oauthLogin } from "@/features/auth/actions/auth.actions";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/features/auth/constants";

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
  const { formData, errors, isLoading, handleInputChange, handleSubmit } = useAuthForm(mode, onSuccess);
  const [isPending, startTransition] = useTransition();

  const handleModeSwitch = () => {
    if (onModeChange) {
      onModeChange(mode === authFormModes.login ? authFormModes.signup : authFormModes.login);
    }
  };

  const handleOAuthLogin = (provider: OAuthProvider) => {
    startTransition(() => {
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

      <div className="flex flex-col gap-2 w-full mt-2">
        <div className="flex w-full gap-2 mb-2">
          {/* Social Provider Buttons */}
          <div className="flex gap-2">
            <Button
              isIconOnly
              radius="full"
              variant="bordered"
              onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GITHUB)}
              isDisabled={isLoading || isPending}
              aria-label={t(authFormButtons.loginWithGithub)}
            >
              <GithubIcon className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="bordered"
              onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GOOGLE)}
              isDisabled={isLoading || isPending}
              aria-label={t(authFormButtons.loginWithGoogle)}
            >
              <GoogleIcon className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="bordered"
              onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.TELEGRAM)}
              isDisabled={isLoading || isPending}
              aria-label={t(authFormButtons.loginWithTelegram)}
            >
              <TelegramIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading || isPending}
            isDisabled={isLoading || isPending}
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
    </Form>
  );
}