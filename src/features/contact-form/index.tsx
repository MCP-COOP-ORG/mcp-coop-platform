"use client";

import React from "react";
import { Form, Button, Checkbox, Card, CardBody } from "@/shared/ui/components/hero-ui";
import {
  contactFormFields,
  contactFormCheckbox,
  contactFormButton,
} from "@/shared/constants/form";
import { useTranslations } from "next-intl";
import { useContactForm } from "@/features/contact-form/hooks/use-contact-form";
import { FormFieldRenderer } from "@/shared/ui/components/form-field-renderer";

export default function ContactForm() {
  const t = useTranslations("Form");

  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange,
    handleSubmit,
  } = useContactForm();

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
                <FormFieldRenderer
                  field={contactFormFields.firstName}
                  value={formData.firstName}
                  t={t}
                  onValueChange={handleInputChange(contactFormFields.firstName.name)}
                  error={errors.firstName}
                  className="flex-1 w-full"
                />
                <FormFieldRenderer
                  field={contactFormFields.lastName}
                  value={formData.lastName}
                  t={t}
                  onValueChange={handleInputChange(contactFormFields.lastName.name)}
                  className="flex-1 w-full"
                />
              </div>
              <div className="w-full pt-6">
                <FormFieldRenderer
                  field={contactFormFields.email}
                  value={formData.email}
                  t={t}
                  onValueChange={handleInputChange(contactFormFields.email.name)}
                  error={errors.email}
                  className="w-full"
                />
                <div className="pt-6">
                  <Checkbox
                    name={contactFormCheckbox.useCurrentAccount}
                    isSelected={formData.useCurrentAccount}
                    onValueChange={handleCheckboxChange}
                  >
                    {t(contactFormCheckbox.useCurrentAccount)}
                  </Checkbox>
                </div>
              </div>
            </div>

            <div className="w-full h-full pt-6 pb-6 border-b border-default-200">
              <FormFieldRenderer
                field={contactFormFields.message}
                value={formData.message}
                t={t}
                onValueChange={handleInputChange(contactFormFields.message.name)}
                error={errors.message}
                isTextarea
                className="w-full h-full"
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
                {t(contactFormButton.submit)}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
