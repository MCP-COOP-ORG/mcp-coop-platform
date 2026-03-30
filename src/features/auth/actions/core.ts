"use server";

import type { AuthResult } from "../types";
import { formErrors } from "@/shared/constants/form";

/**
 * Helper to safely identify Next.js boundary redirects.
 */
export function isNextRedirect(error: unknown): boolean {
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
export async function withAuthAction<T>(
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
