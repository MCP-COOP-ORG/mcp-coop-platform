"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import {
  authFormFields,
  authFormButtons,
  authFormTitles,
  type AuthFormMode,
  type AuthFormData,
} from "@/common/constants/Form";

interface AuthFormProps {
  mode: AuthFormMode;
  onModeChange?: (mode: AuthFormMode) => void;
  onSubmit?: (data: AuthFormData) => void;
  isLoading?: boolean;
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
  onSubmit,
  isLoading = false,
}: AuthFormProps) {
  const [formData, setFormData] = React.useState<AuthFormData>(
    getInitialFormData(mode)
  );

  React.useEffect(() => {
    setFormData(getInitialFormData(mode));
  }, [mode]);

  const handleInputChange = (field: keyof AuthFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
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