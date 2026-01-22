// Common form field interface
export interface FormField {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  isRequired?: boolean;
}

// Common email field (used in both Contact and Auth forms)
export const commonFields = {
  email: {
    label: "Email",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    isRequired: true,
  },
} as const;

// Common form errors
export const commonFormErrors = {
  emailRequired: "Email is required",
  emailInvalid: "Please enter a valid email address",
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
  firstName: {
    label: "First Name",
    placeholder: "Enter your first name",
    name: "firstName",
    type: "text",
    isRequired: true,
  },
  lastName: {
    label: "Last Name",
    placeholder: "Enter your last name",
    name: "lastName",
    type: "text",
    isRequired: false,
  },
  email: commonFields.email,
  message: {
    label: "Message",
    placeholder: "Enter your message",
    name: "message",
    type: "text",
    isRequired: false,
  },
} as const;

export const contactFormCheckbox = {
  useCurrentAccount: "Use current account",
} as const;

export const contactFormButton = {
  submit: "Submit",
} as const;

export const contactFormErrors = {
  firstNameRequired: "First name is required",
  firstNameNoSpaces: "First name cannot contain spaces",
  emailRequired: commonFormErrors.emailRequired,
  emailInvalid: commonFormErrors.emailInvalid,
  messageRequired: "Message is required",
} as const;

// ========== Auth Form ==========
export type AuthFormMode = "login" | "signup";

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export const authFormModes = {
  login: "login" as const,
  signup: "signup" as const,
} as const;

export const authFormFields = {
  email: commonFields.email,
  password: {
    label: "Password",
    placeholder: "Enter your password",
    name: "password",
    type: "password",
    isRequired: true,
  },
  confirmPassword: {
    label: "Confirm Password",
    placeholder: "Confirm your password",
    name: "confirmPassword",
    type: "password",
    isRequired: true,
  },
  name: {
    label: "Name",
    placeholder: "Enter your name",
    name: "name",
    type: "text",
    isRequired: false,
  },
} as const;

export const authFormButtons = {
  login: "Login",
  signup: "Sign Up",
  switchToSignup: "Don't have an account? Sign Up",
  switchToLogin: "Already have an account? Login",
} as const;

export const authFormTitles = {
  login: "Login",
  signup: "Sign Up",
} as const;
