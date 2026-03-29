import { z } from "zod";
import { authCredentialsSchema, signupSchema } from "./validation";
import { TELEGRAM_WIDGET_CONFIG } from "@/shared/constants/telegram";

export type AuthCredentials = z.infer<typeof authCredentialsSchema>;
export type SignupData = z.infer<typeof signupSchema>;

export type CookieSameSite = "lax" | "strict" | "none" | undefined;

export interface AuthResult {
  success: boolean;
  error?: string;
}

export type SignupResult = AuthResult;

/**
 * Telegram Auth Specific Types
 */
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface UseTelegramWidgetOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onAuth: (initData: string) => Promise<AuthResult | void> | void;
  config?: Partial<typeof TELEGRAM_WIDGET_CONFIG>;
}

export interface UseTelegramLinkControllerOptions {
  onSuccess?: () => void;
  onClose?: () => void;
}

export interface TelegramLoginWidgetProps {
  onAuth: (initData: string) => Promise<AuthResult | void> | void;
  isLoading?: boolean;
}

export interface TelegramAuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  onAuth: (initData: string) => Promise<AuthResult | void> | void;
  isPending: boolean;
}
