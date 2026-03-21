// Types
export type { FormField, BaseFormData } from "./types";

// Shared fields (for composition)
export { commonFields } from "./fields";

// All error keys
export { formErrors } from "./errors";

// Auth form
export {
  authFormModes,
  authFormFields,
  authFormButtons,
  authFormTitles,
  type AuthFormMode,
  type AuthFormData,
} from "./forms";

// Contact form
export {
  contactFormFields,
  contactFormCheckbox,
  contactFormButton,
  type ContactFormData,
  type ContactFormError,
} from "./forms";
