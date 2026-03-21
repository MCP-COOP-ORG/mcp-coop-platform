"use client";

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

  const handleModeSwitch = () => {
    if (onModeChange) {
      onModeChange(mode === authFormModes.login ? authFormModes.signup : authFormModes.login);
    }
  };

  return (
    <Form
      className="w-full flex flex-col gap-4"
      validationBehavior="aria"
      onSubmit={handleSubmit}
    >
      {mode === authFormModes.signup && (
        <FormFieldRenderer
          field={authFormFields.name}
          value={formData.name || ""}
          t={t}
          onValueChange={handleInputChange("name")}
          error={errors.name}
        />
      )}

      <FormFieldRenderer
        field={authFormFields.email}
        value={formData.email}
        t={t}
        onValueChange={handleInputChange("email")}
        error={errors.email}
      />

      <FormFieldRenderer
        field={authFormFields.password}
        value={formData.password}
        t={t}
        onValueChange={handleInputChange("password")}
        error={errors.password}
      />

      {mode === authFormModes.signup && (
        <FormFieldRenderer
          field={authFormFields.confirmPassword}
          value={formData.confirmPassword || ""}
          t={t}
          onValueChange={handleInputChange("confirmPassword")}
          error={errors.confirmPassword}
        />
      )}

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          isDisabled={isLoading}
          className="w-full"
        >
          {mode === authFormModes.login ? t(authFormButtons.login) : t(authFormButtons.signup)}
        </Button>

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