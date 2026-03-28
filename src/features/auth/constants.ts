export const OAUTH_PROVIDERS = {
  GITHUB: "github",
  GOOGLE: "google",
  TELEGRAM: "telegram",
} as const;

export type OAuthProvider = typeof OAUTH_PROVIDERS[keyof typeof OAUTH_PROVIDERS];
