"use server";

import type { AuthResult } from "../types";
import { sessionControllerTelegram } from "@/shared/open-api/auth/auth";
import { withAuthAction } from "./core";

/**
 * Server Action for Telegram authentication (Login/Registration/Linking).
 * The backend determines the exact behavior based on the presence of a session JWT.
 */
export async function telegramAuthAction(
  initData: string,
): Promise<AuthResult> {
  return withAuthAction(async () => {
    await sessionControllerTelegram({ initData });
    return { success: true };
  });
}
