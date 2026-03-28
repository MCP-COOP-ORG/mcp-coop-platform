/**
 * Auth cookie names — must match exactly what the NestJS backend sets.
 */
export const AUTH_COOKIE = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;

/**
 * Internal API base URL for server-side fetches.
 * Resolved once at module level from environment variables.
 */
export const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * System-level auth error messages (logs/console, not user-facing).
 */
export const AUTH_ERRORS = {
  invalidCredentials: "Invalid credentials",
  registrationFailed: "Registration failed. User may already exist.",
  serviceUnavailable: "Authentication service unavailable",
} as const;
