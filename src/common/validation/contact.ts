import { z } from "zod";

import { contactFormErrors } from "@/common/constants/Form";
import { emailSchema } from "@/common/validation/auth";

/**
 * Client/server validation schema for the contact form.
 * Reuses shared email validation and centralizes error messages.
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, contactFormErrors.firstNameRequired)
    .refine(
      (value) => !value.includes(" "),
      { message: contactFormErrors.firstNameNoSpaces }
    ),
  lastName: z.string().trim().optional().or(z.literal("")),
  email: emailSchema,
  message: z.string().trim().optional(),
  useCurrentAccount: z.boolean(),
  file: z.any().nullable(),
});

export type ContactFormValidationData = z.infer<typeof contactFormSchema>;

