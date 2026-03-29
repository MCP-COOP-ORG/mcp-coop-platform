import { z } from "zod";
import { formErrors } from "@/shared/constants/form";
import { OTP_CODE_LENGTH } from "@/features/auth/constants";

export const emailSchema = z
  .string()
  .trim()
  .min(1, formErrors.emailRequired)
  .email(formErrors.emailInvalid);

export const requestEmailOtpSchema = z.object({ email: emailSchema });

export const verifyEmailOtpSchema = z.object({
  email: emailSchema,
  code: z.string().length(OTP_CODE_LENGTH, formErrors.invalidOtpCode),
  fullName: z.string().trim().min(1, formErrors.nameRequired).optional(),
});
