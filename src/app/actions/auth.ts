"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signupSchema, authCredentialsSchema, type SignupData, type AuthCredentials } from "@/common/validation/auth";
import { authFormErrors } from "@/common/constants/Form";

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface SignupResult extends AuthResult {}

/**
 * Server Action for user login.
 * Wraps signIn from @/auth to avoid importing Prisma in client components.
 */
export async function login(credentials: AuthCredentials): Promise<AuthResult> {
  try {
    const parsed = authCredentialsSchema.safeParse(credentials);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || authFormErrors.validationFailed,
      };
    }

    const formData = new FormData();
    formData.append("email", parsed.data.email);
    formData.append("password", parsed.data.password);

    try {
      await signIn("credentials", formData);
      // If signIn succeeds, it will throw NEXT_REDIRECT, which we catch below
      return {
        success: true,
      };
    } catch (error: unknown) {
      // NEXT_REDIRECT is not an error, it's Next.js way of redirecting
      // Check if it's a redirect error (Next.js throws this for redirects in Server Actions)
      if (error && typeof error === "object") {
        const errorObj = error as Record<string, unknown>;
        const digest = "digest" in errorObj ? errorObj.digest : null;
        const message = "message" in errorObj ? errorObj.message : null;
        
        if (
          digest === "NEXT_REDIRECT" ||
          (message && String(message).includes("NEXT_REDIRECT"))
        ) {
          // Sign in was successful, redirect is happening
          return {
            success: true,
          };
        }
      }

      // Handle AuthError from NextAuth
      if (error instanceof AuthError) {
        if (error.type === "CredentialsSignin") {
          return {
            success: false,
            error: authFormErrors.invalidCredentials,
          };
        }
        return {
          success: false,
          error: error.message || authFormErrors.invalidCredentials,
        };
      }

      throw error;
    }

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: authFormErrors.invalidCredentials,
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: authFormErrors.internalServerError,
    };
  }
}

/**
 * Server Action for user registration.
 * Validates input, checks for duplicate email, hashes password, and creates user.
 */
export async function signup(data: SignupData): Promise<SignupResult> {
  try {
    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || authFormErrors.validationFailed,
      };
    }

    const { email, password, name } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: authFormErrors.emailAlreadyExists,
      };
    }

    const passwordHash = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name: name || "",
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : authFormErrors.internalServerError,
    };
  }
}

/**
 * Server Action for user logout.
 */
export async function logout(): Promise<AuthResult> {
  try {
    try {
      await signOut();
      return {
        success: true,
      };
    } catch (error: unknown) {
      // NEXT_REDIRECT is not an error, it's Next.js way of redirecting
      if (error && typeof error === "object") {
        const errorObj = error as Record<string, unknown>;
        const digest = "digest" in errorObj ? errorObj.digest : null;
        const message = "message" in errorObj ? errorObj.message : null;

        if (
          digest === "NEXT_REDIRECT" ||
          (message && String(message).includes("NEXT_REDIRECT"))
        ) {
          // Sign out was successful, redirect is happening
          return {
            success: true,
          };
        }
      }
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : authFormErrors.internalServerError,
    };
  }
}
