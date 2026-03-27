"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/core/configs/auth/auth";
import { AUTH_PROVIDER } from "@/shared/constants/auth";
import { signupSchema, authCredentialsSchema } from "../validation";
import type { SignupData, AuthCredentials, AuthResult, SignupResult } from "../types";
import { formErrors } from "@/shared/constants/form";
import { AuthService } from "../api/auth.api";
import type { OAuthProvider } from "../constants";

/**
 * Shared error handler for Server Actions
 */
function handleAuthActionError(error: unknown): AuthResult {
  if (error && typeof error === "object" && "digest" in error) {
    if (String(error.digest).includes("NEXT_REDIRECT")) {
      return { success: true };
    }
  }

  if (error instanceof AuthError) {
    if (error.type === "CredentialsSignin") {
      return { success: false, error: formErrors.invalidCredentials };
    }
    return { success: false, error: error.message || formErrors.invalidCredentials };
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
    
    // Convert to FormData for NextAuth credentials provider
    const formData = new FormData();
    formData.append(AUTH_PROVIDER.fieldNames.email, parsed.data.email);
    formData.append(AUTH_PROVIDER.fieldNames.password, parsed.data.password);

    await signIn(AUTH_PROVIDER.name.toLowerCase(), formData);
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

    const { email, password } = parsed.data;

    // Use Auth API service
    await AuthService.signup(parsed.data);

    // Auto-login
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
    // 1. Clear backend session + dropped Next.js tracked cookies
    await AuthService.logout();

    // 2. Clear NextAuth specifically
    await signOut({ redirect: false });
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
