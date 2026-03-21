import React from "react";
import { type ContactFormData } from "@/shared/constants/form";
import { contactFormSchema } from "@/shared/validation/contact";
import { validateWithZod } from "@/shared/validation/zod";
import { submitContactForm } from "@/features/contact-form/actions/contact.actions";
import { useTranslations } from "next-intl";

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  useCurrentAccount: false,
  file: null,
};

export const useContactForm = () => {
  const sysT = useTranslations("System");

  const [formData, setFormData] = React.useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleInputChange = (field: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (isSelected: boolean) => {
    setFormData((prev) => ({ ...prev, useCurrentAccount: isSelected }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, data, errors: validationErrors } = validateWithZod(contactFormSchema, formData);

    if (!success) {
      setErrors(validationErrors as Partial<Record<keyof ContactFormData, string>>);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(data as ContactFormData);

      if (!result.errors || Object.keys(result.errors).length === 0) {
        setFormData(initialFormData);
        setErrors({});
      } else {
        setErrors({ email: result.errors.email ? sysT(result.errors.email as Parameters<typeof sysT>[0]) : sysT("failedSubmit") });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit,
  };
};
