import type { FormField } from "./types";

/**
 * Reusable field definitions shared across multiple forms.
 * Any form can import and compose these into its own field config.
 */
export const commonFields = {
  email: {
    label: "email",
    placeholder: "emailPlaceholder",
    name: "email",
    type: "email",
    isRequired: true,
  },
  firstName: {
    label: "firstName",
    placeholder: "firstNamePlaceholder",
    name: "firstName",
    type: "text",
    isRequired: true,
  },
  lastName: {
    label: "lastName",
    placeholder: "lastNamePlaceholder",
    name: "lastName",
    type: "text",
    isRequired: false,
  },
  name: {
    label: "name",
    placeholder: "namePlaceholder",
    name: "name",
    type: "text",
    isRequired: false,
  },
  password: {
    label: "password",
    placeholder: "passwordPlaceholder",
    name: "password",
    type: "password",
    isRequired: true,
  },
  confirmPassword: {
    label: "confirmPassword",
    placeholder: "confirmPasswordPlaceholder",
    name: "confirmPassword",
    type: "password",
    isRequired: true,
  },
  message: {
    label: "message",
    placeholder: "messagePlaceholder",
    name: "message",
    type: "text",
    isRequired: false,
  },
} as const satisfies Record<string, FormField>;
