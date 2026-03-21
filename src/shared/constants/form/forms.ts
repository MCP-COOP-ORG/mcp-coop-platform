import { commonFields } from "./fields";

// ========== Auth Form ==========

export const authFormModes = {
  login: "login",
  signup: "signup",
} as const;

export type AuthFormMode = (typeof authFormModes)[keyof typeof authFormModes];

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export const authFormFields = {
  email: commonFields.email,
  password: commonFields.password,
  confirmPassword: commonFields.confirmPassword,
  name: commonFields.name,
} as const;

export const authFormButtons = {
  login: "login",
  signup: "signup",
  switchToSignup: "switchToSignup",
  switchToLogin: "switchToLogin",
} as const;

export const authFormTitles = {
  login: "login",
  signup: "signup",
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
