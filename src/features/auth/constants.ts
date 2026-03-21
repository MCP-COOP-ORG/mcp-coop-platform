export const authCookiePatterns = {
  includes: ["token", "auth", "session"] as const,
  excludes: ["next-auth"] as const,
} as const;
