"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { login, signup } from "@/app/actions/auth";
import {
  authFormFields,
  authFormButtons,
  authFormErrors,
  type AuthFormMode,
  type AuthFormData,
} from "@/common/constants/Form";
import { authCredentialsSchema, SignupData, signupSchema } from "@/common/validation/auth";
import { validateWithZod } from "@/common/validation/zod";

interface AuthFormProps {
  mode: AuthFormMode;
  onModeChange?: (mode: AuthFormMode) => void;
  onSuccess?: () => void;
}

const getInitialFormData = (mode: AuthFormMode): AuthFormData => {
  const base = {
    email: "",
    password: "",
  };

  if (mode === "signup") {
    return {
      ...base,
      confirmPassword: "",
      name: "",
    };
  }

  return base;
};

export default function AuthForm({
  mode,
  onModeChange,
  onSuccess,
}: AuthFormProps) {
  const [formData, setFormData] = React.useState<AuthFormData>(
    getInitialFormData(mode)
  );
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof AuthFormData, string>>
  >({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setFormData(getInitialFormData(mode));
    setErrors({});
  }, [mode]);

  const handleInputChange = (field: keyof AuthFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = mode === "login" ? authCredentialsSchema : signupSchema;
    const { success, data, errors: validationErrors } = validateWithZod(
      schema,
      formData
    );

    if (!success) {
      setErrors(validationErrors as Partial<Record<keyof AuthFormData, string>>);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (mode === "login") {
        const result = await login({
          email: data.email,
          password: data.password,
        });

        if (!result.success) {
          setErrors({
            email: result.error,
          });
          return;
        }

        if (onSuccess) {
          onSuccess();
        }
      } else {
        const result = await signup(data as SignupData);

        if (!result.success) {
          setErrors({
            email: result.error,
          });
          return;
        }

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      setErrors({
        email: error instanceof Error ? error.message : authFormErrors.internalServerError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = () => {
    if (onModeChange) {
      const newMode = mode === "login" ? "signup" : "login";
      onModeChange(newMode);
    }
  };

  return (
    <Form
      className="w-full flex flex-col gap-4"
      validationBehavior="aria"
      onSubmit={handleSubmit}
    >
      {mode === "signup" && (
        <Input
          variant="bordered"
          label={authFormFields.name.label}
          labelPlacement="outside"
          name={authFormFields.name.name}
          placeholder={authFormFields.name.placeholder}
          type={authFormFields.name.type}
          value={formData.name || ""}
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name}
          onValueChange={handleInputChange("name")}
        />
      )}

      <Input
        variant="bordered"
        label={authFormFields.email.label}
        labelPlacement="outside"
        name={authFormFields.email.name}
        placeholder={authFormFields.email.placeholder}
        type={authFormFields.email.type}
        isRequired={authFormFields.email.isRequired}
        value={formData.email}
        isInvalid={Boolean(errors.email)}
        errorMessage={errors.email}
        onValueChange={handleInputChange("email")}
      />

      <Input
        variant="bordered"
        label={authFormFields.password.label}
        labelPlacement="outside"
        name={authFormFields.password.name}
        placeholder={authFormFields.password.placeholder}
        type={authFormFields.password.type}
        isRequired={authFormFields.password.isRequired}
        value={formData.password}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password}
        onValueChange={handleInputChange("password")}
      />

      {mode === "signup" && (
        <Input
          variant="bordered"
          label={authFormFields.confirmPassword.label}
          labelPlacement="outside"
          name={authFormFields.confirmPassword.name}
          placeholder={authFormFields.confirmPassword.placeholder}
          type={authFormFields.confirmPassword.type}
          isRequired={authFormFields.confirmPassword.isRequired}
          value={formData.confirmPassword || ""}
          isInvalid={Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword}
          onValueChange={handleInputChange("confirmPassword")}
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
          {mode === "login" ? authFormButtons.login : authFormButtons.signup}
        </Button>

        {onModeChange && (
          <Button
            type="button"
            variant="light"
            onPress={handleModeSwitch}
            className="w-full"
          >
            {mode === "login"
              ? authFormButtons.switchToSignup
              : authFormButtons.switchToLogin}
          </Button>
        )}
      </div>
    </Form>
  );
}