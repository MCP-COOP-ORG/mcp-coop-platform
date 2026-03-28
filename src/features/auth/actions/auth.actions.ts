"use server";

import { redirect } from "next/navigation";
import { signupSchema, authCredentialsSchema } from "../validation";
import type { SignupData, AuthCredentials, AuthResult, SignupResult } from "../types";
import { formErrors } from "@/shared/constants/form";
import { AuthService } from "../api/auth.api";
import type { OAuthProvider } from "../constants";

/**
 * Shared error handler for Server Actions.
 */
function handleAuthActionError(error: unknown): AuthResult {
  if (error && typeof error === "object" && "digest" in error) {
    if (String(error.digest).includes("NEXT_REDIRECT")) {
      return { success: true };
    }
  }

  if (error instanceof Error) {
    return { success: false, error: error.message };
  }

  return { success: false, error: formErrors.internalServerError };
}

/**
 * Server Action for user login.
 */
export async function login(credentials: AuthCredentials): Promise<AuthResult> {
  try {
    const parsed = authCredentialsSchema.safeParse(credentials);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || formErrors.validationFailed };
    }

    await AuthService.login({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    return { success: true };
  } catch (error) {
    return handleAuthActionError(error);
  }
}

/**
 * Server Action for user registration.
 */
export async function signup(data: SignupData): Promise<SignupResult> {
  try {
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || formErrors.validationFailed };
    }

    await AuthService.signup(parsed.data);

    // Auto-login after successful registration
    const { email, password } = parsed.data;
    return await login({ email, password });
  } catch (error) {
    return handleAuthActionError(error);
  }
}

/**
 * Server Action for user logout.
 */
export async function logout(): Promise<AuthResult> {
  try {
    await AuthService.logout();
    return { success: true };
  } catch (error) {
    return handleAuthActionError(error);
  }
}

/**
 * Server Action for OAuth login redirects.
 */
export async function oauthLogin(provider: OAuthProvider): Promise<void> {
  const url = AuthService.getOAuthLoginUrl(provider);
  redirect(url);
}
