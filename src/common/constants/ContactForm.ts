export interface ContactFormField {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  isRequired?: boolean;
}

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
  email: {
    label: "Email",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    isRequired: true,
  },
  message: {
    label: "Message",
    placeholder: "Enter your message",
    name: "message",
    type: "text",
    isRequired: false,
  },
} as const;

export const contactFormLabels = {
  firstName: contactFormFields.firstName.label,
  lastName: contactFormFields.lastName.label,
  email: contactFormFields.email.label,
  message: contactFormFields.message.label,
} as const;

export const contactFormPlaceholders = {
  firstName: contactFormFields.firstName.placeholder,
  lastName: contactFormFields.lastName.placeholder,
  email: contactFormFields.email.placeholder,
  message: contactFormFields.message.placeholder,
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
  emailRequired: "Email is required",
  emailInvalid: "Please enter a valid email address",
  messageRequired: "Message is required",
} as const;
