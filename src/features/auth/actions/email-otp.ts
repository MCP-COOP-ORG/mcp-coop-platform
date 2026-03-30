"use server";

import {
  requestEmailOtpSchema,
  verifyEmailOtpSchema,
} from "../validation";
import type { AuthResult } from "../types";
import { formErrors } from "@/shared/constants/form";
import {
  emailOtpControllerRequestOtp,
  emailOtpControllerVerifyOtp,
} from "@/shared/open-api/auth/auth";
import type { RequestEmailOtpResponseDto } from "@/shared/open-api/models";
import { withAuthAction } from "./core";

export type RequestEmailOtpActionResult = AuthResult & {
  expiresIn?: number;
  isNewUser?: boolean;
};

/**
 * Step 1: Request an OTP code for passwordless login/registration.
 * POST /api/auth/email/request
 *
 * Returns expiresIn (seconds) and isNewUser flag so the client can:
 * - start the countdown timer (Date.now() + expiresIn * 1000)
 * - conditionally show the fullName field
 */
export async function requestEmailOtpAction(
  email: string,
): Promise<RequestEmailOtpActionResult> {
  return withAuthAction(async () => {
    const parsed = requestEmailOtpSchema.safeParse({ email });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? formErrors.validationFailed,
      };
    }

    const response = await emailOtpControllerRequestOtp({
      email: parsed.data.email,
    });

    if (response.status !== 200) {
      return { success: false, error: formErrors.internalServerError };
    }

    const dto = response.data as RequestEmailOtpResponseDto;
    return {
      success: true,
      expiresIn: dto.expiresIn,
      isNewUser: dto.isNewUser,
    };
  });
}

/**
 * Step 2: Verify OTP code and authenticate the user.
 * POST /api/auth/email/verify
 *
 * If isNewUser was true in Step 1, fullName must be provided.
 */
export async function verifyEmailOtpAction(dto: {
  email: string;
  code: string;
  fullName?: string;
}): Promise<AuthResult> {
  return withAuthAction(async () => {
    const parsed = verifyEmailOtpSchema.safeParse(dto);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? formErrors.validationFailed,
      };
    }

    let response;
    try {
      response = await emailOtpControllerVerifyOtp({
        email: parsed.data.email,
        code: parsed.data.code,
        ...(parsed.data.fullName ? { fullName: parsed.data.fullName } : {}),
      });
    } catch (error) {
      if (error instanceof Error && error.message.toLowerCase().includes("invalid")) {
        throw new Error(formErrors.invalidOtpCode);
      }
      throw error;
    }

    if (response.status !== 200) {
      return { success: false, error: formErrors.internalServerError };
    }

    return { success: true };
  });
}
