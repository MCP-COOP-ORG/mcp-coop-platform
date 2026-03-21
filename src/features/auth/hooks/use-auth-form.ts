import React from "react";
import { useTranslations } from "next-intl";
import { login, signup } from "@/features/auth/actions/auth.actions";
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
  const [errors, setErrors] = React.useState<Partial<Record<keyof AuthFormData, string>>>({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setFormData(getInitialFormData(mode));
    setErrors({});
  }, [mode]);

  const handleInputChange = (field: keyof AuthFormData) => (value: string) => {
    setFormData((prev: AuthFormData) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: Partial<Record<keyof AuthFormData, string>>) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = mode === authFormModes.login ? authCredentialsSchema : signupSchema;
    const { success, data, errors: validationErrors } = validateWithZod(schema, formData);

    if (!success) {
      setErrors(validationErrors as Partial<Record<keyof AuthFormData, string>>);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = mode === authFormModes.login 
        ? await login({ email: data.email, password: data.password })
        : await signup(data as SignupData);

      if (!result.success) {
        setErrors({ email: result.error });
        return;
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      setErrors({
        email: error instanceof Error ? error.message : t(formErrors.internalServerError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, errors, isLoading, handleInputChange, handleSubmit };
};
