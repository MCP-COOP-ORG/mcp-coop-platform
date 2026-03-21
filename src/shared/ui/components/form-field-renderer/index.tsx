"use client";

import { Input, Textarea } from "@/shared/ui/components/hero-ui";
import type { FormField } from "@/shared/constants/form";

/** i18n translation function type — matches next-intl useTranslations return */
type TranslationFn = (key: string) => string;

interface FormFieldRendererProps {
  /** Field configuration from shared/constants/form */
  field: FormField;
  /** Current field value */
  value: string;
  /** i18n translation function (from useTranslations) */
  t: TranslationFn;
  /** Value change handler */
  onValueChange: (value: string) => void;
  /** Optional error message key (i18n key or undefined) */
  error?: string;
  /** Render as textarea instead of input */
  isTextarea?: boolean;
  /** Additional className for the field wrapper */
  className?: string;
}

/**
 * Factory component that renders a HeroUI Input or Textarea from a FormField config.
 *
 * Eliminates repetitive:
 * - `label={t(field.label as Parameters<typeof t>[0])}`
 * - `placeholder={t(field.placeholder as Parameters<typeof t>[0])}`
 * - `errorMessage={errors.x ? t(errors.x as ...) : undefined}`
 *
 * Usage:
 * ```tsx
 * <FormFieldRenderer
 *   field={authFormFields.email}
 *   value={formData.email}
 *   t={t}
 *   onValueChange={handleInputChange("email")}
 *   error={errors.email}
 * />
 * ```
 */
export function FormFieldRenderer({
  field,
  value,
  t,
  onValueChange,
  error,
  isTextarea = false,
  className,
}: FormFieldRendererProps) {
  const sharedProps = {
    variant: "bordered" as const,
    label: t(field.label),
    labelPlacement: "outside" as const,
    name: field.name,
    placeholder: t(field.placeholder),
    isRequired: field.isRequired,
    value,
    onValueChange,
    isInvalid: Boolean(error),
    errorMessage: error ? t(error) : undefined,
    className,
  };

  if (isTextarea) {
    return <Textarea {...sharedProps} />;
  }

  return <Input {...sharedProps} type={field.type} />;
}
