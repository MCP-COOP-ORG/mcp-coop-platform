import { z } from "zod";
import { commonFormErrors, authFormErrors } from "@/common/constants/Form";

/**
 * Base schema for validating email.
 * Shared between client and server.
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, commonFormErrors.emailRequired)
  .email(commonFormErrors.emailInvalid);

/**
 * Base schema for validating password.
 * Shared between client and server.
 */
export const passwordSchema = z
  .string()
  .min(8, authFormErrors.passwordMinLength);

/**
 * Common auth credentials schema (email + password).
 * Can be reused in login/signup flows on both client and server.
 */
export const authCredentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Signup schema (email + password + confirmPassword + optional name).
 * Can be reused on client and server for signup flows.
 */
export const signupSchema = authCredentialsSchema
  .extend({
    confirmPassword: passwordSchema,
    name: z.string().trim().min(1, authFormErrors.nameRequired).optional(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: authFormErrors.passwordsMismatch,
    }
  );
