import { commonFields } from "./fields";

// ========== Auth Form ==========

/**
 * Auth form field definitions — only email and name remain.
 * Password fields are removed: auth is now passwordless (email OTP).
 */
export const authFormFields = {
  email: commonFields.email,
  name: commonFields.name,
} as const;

/**
 * i18n keys for auth form buttons.
 * login/signup mode-switch keys removed — there is no longer a login/signup distinction.
 */
export const authFormButtons = {
  submit: "submit",
  loginWithGithub: "loginWithGithub",
  loginWithGoogle: "loginWithGoogle",
  loginWithTelegram: "loginWithTelegram",
} as const;

export const authFormTitles = {
  auth: "auth",
} as const;

// ========== Contact Form ==========

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  useCurrentAccount: boolean;
  file: File | null;
}

export interface ContactFormError {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  file?: string;
  [key: string]: string | undefined;
}

export const contactFormFields = {
  firstName: commonFields.firstName,
  lastName: commonFields.lastName,
  email: commonFields.email,
  message: commonFields.message,
} as const;

export const contactFormCheckbox = {
  useCurrentAccount: "useCurrentAccount",
} as const;

export const contactFormButton = {
  submit: "submit",
} as const;
