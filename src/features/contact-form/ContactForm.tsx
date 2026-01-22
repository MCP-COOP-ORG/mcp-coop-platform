"use client";

import React from "react";
import {Form, Input, Button, Checkbox, Textarea, Card, CardBody} from "@heroui/react";
import {
  contactFormFields,
  contactFormCheckbox,
  contactFormButton,
  contactFormErrors,
  type ContactFormData,
} from "@/common/constants/ContactForm";

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  useCurrentAccount: false,
  file: null,
};

const validateFirstName = (value: string): string | null => {
  if (!value || value.length === 0) {
    return contactFormErrors.firstNameRequired;
  }
  
  if (value.includes(" ")) {
    return contactFormErrors.firstNameNoSpaces;
  }

  return null;
};

const validateEmailFormat = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateEmail = (value: string): string | null => {
  if (!value) {
    return contactFormErrors.emailRequired;
  }

  if (!validateEmailFormat(value)) {
    return contactFormErrors.emailInvalid;
  }

  return null;
};

export default function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [shouldValidate, setShouldValidate] = React.useState(false);

  const handleInputChange = (field: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({...prev, [field]: value}));
  };

  const handleCheckboxChange = (isSelected: boolean) => {
    setFormData((prev) => ({...prev, useCurrentAccount: isSelected}));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({...prev, file}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enable validation on submit attempt
    setShouldValidate(true);

    // Run client-side validation before sending data
    const firstNameError = validateFirstName(formData.firstName);
    const emailError = validateEmail(formData.email);

    if (firstNameError || emailError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitFormData(formData);

      if (!result.errors || Object.keys(result.errors).length === 0) {
        // Success - reset form
        setFormData(initialFormData);
        setShouldValidate(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl bg-white/20 backdrop-blur-sm">
        <CardBody className="p-6">
          <Form
            className="w-full flex flex-col"
            validationBehavior="aria"
            onSubmit={handleSubmit}
          >
            <div className="w-full pb-6 border-b border-default-200">
              <div className="flex gap-4 w-full">
                <Input
                  className="flex-1 w-full"
                  label={contactFormFields.firstName.label}
                  labelPlacement="outside"
                  name={contactFormFields.firstName.name}
                  placeholder={contactFormFields.firstName.placeholder}
                  type={contactFormFields.firstName.type}
                  isRequired={contactFormFields.firstName.isRequired}
                  value={formData.firstName}
                  onValueChange={handleInputChange("firstName")}
                  validate={shouldValidate ? validateFirstName : undefined}
                />
                <Input
                  className="flex-1 w-full"
                  label={contactFormFields.lastName.label}
                  labelPlacement="outside"
                  name={contactFormFields.lastName.name}
                  placeholder={contactFormFields.lastName.placeholder}
                  type={contactFormFields.lastName.type}
                  value={formData.lastName}
                  onValueChange={handleInputChange("lastName")}
                />
              </div>
              <div className="w-full pt-6">
                <Input
                  className="w-full"
                  label={contactFormFields.email.label}
                  labelPlacement="outside"
                  name={contactFormFields.email.name}
                  placeholder={contactFormFields.email.placeholder}
                  type={contactFormFields.email.type}
                  isRequired={contactFormFields.email.isRequired}
                  value={formData.email}
                  onValueChange={handleInputChange("email")}
                  validate={shouldValidate ? validateEmail : undefined}
                />
                <div className="pt-6">
                  <Checkbox
                    name="useCurrentAccount"
                    isSelected={formData.useCurrentAccount}
                    onValueChange={handleCheckboxChange}
                  >
                    {contactFormCheckbox.useCurrentAccount}
                  </Checkbox>
                </div>
              </div>
            </div>

            <div className="w-full h-full pt-6 pb-6 border-b border-default-200">
              <Textarea
                className="w-full h-full"
                label={contactFormFields.message.label}
                labelPlacement="outside"
                name={contactFormFields.message.name}
                placeholder={contactFormFields.message.placeholder}
                value={formData.message}
                onValueChange={handleInputChange("message")}
              />
            </div>

            <div className="flex gap-4 w-full pt-6">
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                className="flex-1 w-full px-3 py-2 text-sm border border-default-200 rounded-lg bg-background text-foreground cursor-pointer hover:border-default-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground file:cursor-pointer hover:file:bg-primary/90"
              />
              <Button 
                type="submit" 
                color="primary" 
                className="min-w-32 h-full"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                {contactFormButton.submit}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

/**
 * Submits form data to the server.
 * Replace this with your actual API endpoint.
 */
async function submitFormData(data: ContactFormData): Promise<{errors?: Record<string, string>}> {
  // Create FormData for file upload support
  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);
  formData.append("message", data.message);
  formData.append("useCurrentAccount", String(data.useCurrentAccount));
  
  if (data.file) {
    formData.append("file", data.file);
  }

  try {
    // Replace with your actual API endpoint
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        errors: errorData.errors || {
          email: "Failed to submit form. Please try again.",
        },
      };
    }

    return {};
  } catch (error) {
    // For development: simulate API call
    // Remove this in production and use actual API
    console.log("Form data submitted:", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
      useCurrentAccount: data.useCurrentAccount,
      file: data.file?.name,
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return empty errors on success
    return {};
  }
}



