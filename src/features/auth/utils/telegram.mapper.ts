import { TelegramUser } from "@/features/auth/types";

/**
 * Parses the raw Telegram User DTO and maps it to a URLSearchParams flat string
 * matching the Hexagonal Backend API HMAC-SHA256 signature verification payload.
 */
export const serializeTelegramPayload = (user: TelegramUser | null): string => {
  if (!user) return "";
  
  const searchParams = new URLSearchParams();
  
  Object.keys(user).forEach((key) => {
    const val = user[key];
    if (val !== undefined && val !== null) {
      searchParams.append(key, String(val));
    }
  });

  return searchParams.toString();
};
