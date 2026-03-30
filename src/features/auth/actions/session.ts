"use server";

import { cookies } from "next/headers";
import type { AuthResult } from "../types";
import { AUTH_COOKIE } from "@/shared/constants/auth";
import { sessionControllerLogout } from "@/shared/open-api/auth/auth";
import { withAuthAction } from "./core";

/**
 * Server Action for user logout.
 * Backend logout errors are intentionally swallowed — local cookie cleanup
 * must always proceed regardless of backend state.
 */
export async function logout(): Promise<AuthResult> {
  return withAuthAction(async () => {
    await sessionControllerLogout().catch(() => {
      // Intentional: backend errors must not block local session cleanup
    });
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE.accessToken);
    cookieStore.delete(AUTH_COOKIE.refreshToken);
    return { success: true };
  });
}
