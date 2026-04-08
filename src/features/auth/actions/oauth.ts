"use server";

import { redirect } from "next/navigation";
import type { OAuthProvider } from "../constants";
import { getOAuthControllerRedirectUrl } from "@/shared/open-api/auth/auth";

/**
 * Server Action for OAuth provider redirects.
 */
export async function oauthLogin(provider: OAuthProvider, returnTo?: string): Promise<void> {
  const baseUrl = getOAuthControllerRedirectUrl(provider);
  const targetUrl = returnTo ? `${baseUrl}?returnTo=${encodeURIComponent(returnTo)}` : baseUrl;
  redirect(targetUrl);
}
