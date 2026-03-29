import React, { useTransition } from "react";
import { useTranslations } from "next-intl";
import { login, signup } from "@/features/auth/actions";
import { authFormModes, formErrors, type AuthFormMode, type AuthFormData } from "@/shared/constants/form";
import { authCredentialsSchema, signupSchema } from "@/features/auth/validation";
import type { SignupData } from "@/features/auth/types";
import { validateWithZod } from "@/shared/validation/zod";

const getInitialFormData = (mode: AuthFormMode): AuthFormData => {
  const base = { email: "", password: "" };
  if (mode === authFormModes.signup) return { ...base, confirmPassword: "", name: "" };
  return base;
};

export const useAuthForm = (mode: AuthFormMode, onSuccess?: () => void) => {
  const t = useTranslations("Form");

  const [formData, setFormData] = React.useState<AuthFormData>(getInitialFormData(mode));
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<keyof AuthFormData, string>>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    setFormData(getInitialFormData(mode));
    setFieldErrors({});
    setServerError(null);
  }, [mode]);

  const handleInputChange = (field: keyof AuthFormData) => (value: string) => {
    setFormData((prev: AuthFormData) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev: Partial<Record<keyof AuthFormData, string>>) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = mode === authFormModes.login ? authCredentialsSchema : signupSchema;
    const { success, data, errors: validationErrors } = validateWithZod(schema, formData);

    if (!success) {
      setFieldErrors(validationErrors as Partial<Record<keyof AuthFormData, string>>);
      return;
    }

    setFieldErrors({});
    setServerError(null);

    startTransition(async () => {
      try {
        const result =
          mode === authFormModes.login
            ? await login({ email: data.email, password: data.password })
            : await signup(data as SignupData);

        if (!result.success) {
          setServerError(result.error ?? formErrors.internalServerError);
          return;
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          error instanceof Error ? error.message : t(formErrors.internalServerError),
        );
      }
    });
  };

  return {
    formData,
    errors: fieldErrors,
    serverError,
    isPending,
    handleInputChange,
    handleSubmit,
  };
};
