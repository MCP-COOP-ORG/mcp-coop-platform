"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  requestEmailOtpSchema,
  verifyEmailOtpSchema,
} from "../validation";
import type { AuthResult } from "../types";
import { formErrors } from "@/shared/constants/form";
import { AUTH_COOKIE } from "@/shared/constants/auth";
import type { OAuthProvider } from "../constants";
import {
  authControllerRequestEmailOtp,
  authControllerVerifyEmailOtp,
  authControllerLogout,
  authControllerLoginTelegram,
  authControllerLinkTelegramAccount,
} from "@/shared/open-api/auth/auth";
import type { RequestEmailOtpResponseDto } from "@/shared/open-api/models";

// ─── Controller Wrapper ───────────────────────────────────────────────────────

/**
 * Helper to safely identify Next.js boundary redirects.
 */
function isNextRedirect(error: unknown): boolean {
  if (error && typeof error === "object" && "digest" in error) {
    return String((error as { digest: string }).digest).includes("NEXT_REDIRECT");
  }
  return false;
}

/**
 * Higher-Order Function to standardize Auth Server Actions.
 * Catches internal errors to prevent Next.js boundaries from crashing,
 * while safely re-throwing NEXT_REDIRECTs.
 */
async function withAuthAction<T>(
  actionFn: () => Promise<T>,
): Promise<T | AuthResult> {
  try {
    return await actionFn();
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: formErrors.internalServerError };
  }
}

// ─── Email OTP Flow ───────────────────────────────────────────────────────────

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

    const response = await authControllerRequestEmailOtp({
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
      response = await authControllerVerifyEmailOtp({
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

// ─── Logout ───────────────────────────────────────────────────────────────────

/**
 * Server Action for user logout.
 * Backend logout errors are intentionally swallowed — local cookie cleanup
 * must always proceed regardless of backend state.
 */
export async function logout(): Promise<AuthResult> {
  return withAuthAction(async () => {
    await authControllerLogout().catch(() => {
      // Intentional: backend errors must not block local session cleanup
    });
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE.accessToken);
    cookieStore.delete(AUTH_COOKIE.refreshToken);
    return { success: true };
  });
}

// ─── OAuth ────────────────────────────────────────────────────────────────────

/**
 * Server Action for OAuth provider redirects.
 */
export async function oauthLogin(provider: OAuthProvider): Promise<void> {
  redirect(`/api/auth/oauth/${provider}`);
}

// ─── Telegram ─────────────────────────────────────────────────────────────────

/**
 * Server Action for Telegram Login via InitData string.
 */
export async function loginWithTelegramAction(
  initData: string,
): Promise<AuthResult> {
  return withAuthAction(async () => {
    await authControllerLoginTelegram({ initData });
    return { success: true };
  });
}

/**
 * Server Action for linking a Telegram account to an existing web account.
 */
export async function linkTelegramAction(
  initData: string,
): Promise<AuthResult> {
  return withAuthAction(async () => {
    await authControllerLinkTelegramAccount({ initData });
    return { success: true };
  });
}
