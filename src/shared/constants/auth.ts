/**
 * Auth provider configuration constants.
 * Used by NextAuth Credentials provider — not user-facing.
 */
export const AUTH_PROVIDER = {
  name: "Credentials",
  fieldNames: {
    email: "email",
    password: "password",
  },
  fields: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
} as const;

/**
 * System-level auth error messages (logs/console, not user-facing).
 */
export const AUTH_ERRORS = {
  invalidCredentialsFormat: "Invalid credentials format",
  invalidServerResponse: "Invalid response from server",
  serviceUnavailable: "Authentication service unavailable",
} as const;
