"use server";

import { redirect } from "next/navigation";
import type { OAuthProvider } from "../constants";
import { getOAuthControllerRedirectUrl } from "@/shared/open-api/auth/auth";

/**
 * Server Action for OAuth provider redirects.
 */
export async function oauthLogin(provider: OAuthProvider): Promise<void> {
  redirect(getOAuthControllerRedirectUrl(provider));
}
