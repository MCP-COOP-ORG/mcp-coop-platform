import type { TelegramUser } from "@/features/auth/types";

/**
 * Maps a TelegramUser object to a URLSearchParams string
 * matching the NestJS backend HMAC-SHA256 signature verification format.
 * Uses explicit field mapping to maintain strict TypeScript types.
 */
export const serializeTelegramPayload = (user: TelegramUser | null): string => {
  if (!user) return "";

  const fields: Array<[string, string | number | undefined]> = [
    ["id", user.id],
    ["first_name", user.first_name],
    ["last_name", user.last_name],
    ["username", user.username],
    ["photo_url", user.photo_url],
    ["auth_date", user.auth_date],
    ["hash", user.hash],
  ];

  const searchParams = new URLSearchParams();

  for (const [key, val] of fields) {
    if (val !== undefined && val !== null) {
      searchParams.append(key, String(val));
    }
  }

  return searchParams.toString();
};
