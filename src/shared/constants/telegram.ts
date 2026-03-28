export const TELEGRAM_BOT_NAME =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "";

export const TELEGRAM_WIDGET_SCRIPT_URL =
  "https://telegram.org/js/telegram-widget.js?22";

export const TELEGRAM_WIDGET_CONFIG = {
  size: "large",
  radius: "16", // Modern design match
  requestAccess: "write",
} as const;
