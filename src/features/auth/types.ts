import { TELEGRAM_WIDGET_CONFIG } from "@/shared/constants/telegram";

// ─── OTP Flow Steps ───────────────────────────────────────────────────────────

export const OTP_FLOW_STEPS = {
  IDLE:       "idle",
  CODE_SENT:  "code_sent",
} as const;

export type OtpFlowStep = (typeof OTP_FLOW_STEPS)[keyof typeof OTP_FLOW_STEPS];

// ─── Shared Auth Result ───────────────────────────────────────────────────────

export interface AuthResult {
  success: boolean;
  error?: string;
}

// ─── Telegram Auth Types ──────────────────────────────────────────────────────

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
