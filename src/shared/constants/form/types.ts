/**
 * Base form field type — used by all forms and FormFieldRenderer.
 */
export interface FormField {
  /** i18n key for the field label */
  label: string;
  /** i18n key for the field placeholder */
  placeholder: string;
  /** HTML name attribute / form data key */
  name: string;
  /** HTML input type (text, email, password, etc.) */
  type?: string;
  /** Whether the field is required */
  isRequired?: boolean;
}

/**
 * Base form data type — all form data objects extend Record<string, unknown>.
 * Use this to type generic form handlers.
 */
export type BaseFormData = Record<string, unknown>;
