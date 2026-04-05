/**
 * Contact field keys used in backend response DTOs.
 * All string access to contact dictionaries MUST use these constants.
 */
export const CONTACT_KEYS = {
  telegram: "TELEGRAM",
  whatsapp: "WHATSAPP",
  viber: "VIBER",
  phone: "PHONE",
  email: "EMAIL",
  instagram: "INSTAGRAM",
  facebook: "FACEBOOK",
  linkedin: "LINKEDIN",
} as const;

export type ContactKey = keyof typeof CONTACT_KEYS;
