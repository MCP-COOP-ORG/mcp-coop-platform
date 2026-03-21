import { z } from "zod";

import { formErrors } from "@/shared/constants/form";
import { emailSchema } from "@/features/auth/validation";

/**
 * Client/server validation schema for the contact form.
 * Reuses shared email validation and centralizes error messages.
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, formErrors.firstNameRequired)
    .refine(
      (value) => !value.includes(" "),
      { message: formErrors.firstNameNoSpaces }
    ),
  lastName: z.string().trim().optional().or(z.literal("")),
  email: emailSchema,
  message: z.string().trim().optional(),
  useCurrentAccount: z.boolean(),
  file: z.unknown().nullable(),
});

export type ContactFormValidationData = z.infer<typeof contactFormSchema>;

