/**
 * All form error message i18n keys — centralized for DRY.
 * Grouped by scope: common, auth-specific, contact-specific.
 */
export const formErrors = {
  // Common
  emailRequired: "emailRequired",
  emailInvalid: "emailInvalid",
  validationFailed: "validationFailed",
  internalServerError: "internalServerError",

  // Auth-specific
  passwordMinLength: "passwordMinLength",
  nameRequired: "nameRequired",
  passwordsMismatch: "passwordsMismatch",
  emailAlreadyExists: "emailAlreadyExists",
  invalidCredentials: "invalidCredentials",

  // Contact-specific
  firstNameRequired: "firstNameRequired",
  firstNameNoSpaces: "firstNameNoSpaces",
  messageRequired: "messageRequired",
} as const;
