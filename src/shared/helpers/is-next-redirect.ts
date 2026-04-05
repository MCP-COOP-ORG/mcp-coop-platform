/**
 * Helper to safely identify Next.js boundary redirects.
 * Next.js throws special errors to handle redirects, which we need to re-throw
 * instead of catching them as normal errors.
 */
export function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as Record<string, unknown>).digest === "string" &&
    ((error as Record<string, unknown>).digest as string).startsWith("NEXT_REDIRECT")
  );
}
