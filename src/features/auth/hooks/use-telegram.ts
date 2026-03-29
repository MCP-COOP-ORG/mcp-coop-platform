import { useEffect, useRef, useState, useTransition } from "react";
import { TELEGRAM_BOT_NAME, TELEGRAM_WIDGET_CONFIG, TELEGRAM_WIDGET_SCRIPT_URL } from "@/shared/constants/telegram";
import { TelegramUser, UseTelegramWidgetOptions, UseTelegramLinkControllerOptions, AuthResult } from "@/features/auth/types";
import { serializeTelegramPayload } from "@/features/auth/utils/telegram.mapper";
import { useRouter } from "@/core/configs/i18n/routing";
import { linkTelegramAction, loginWithTelegramAction } from "@/features/auth/actions";


interface ExtendedWindow extends Window {
  onTelegramAuth?: (user: TelegramUser) => void;
}

/**
 * Hook for injecting and managing the Telegram Login Widget script.
 */
export function useTelegramWidget({ containerRef, onAuth, config }: UseTelegramWidgetOptions) {
  const [error] = useState<string | null>(
    !TELEGRAM_BOT_NAME ? "Configuration error: Telegram Bot Name is missing." : null
  );

  const onAuthRef = useRef(onAuth);
  useEffect(() => {
    onAuthRef.current = onAuth;
  }, [onAuth]);

  useEffect(() => {
    if (!TELEGRAM_BOT_NAME) {
      console.error("NEXT_PUBLIC_TELEGRAM_BOT_NAME is not defined in environment variables");
      return;
    }

    const currentWindow = window as unknown as ExtendedWindow;

    currentWindow.onTelegramAuth = async (user: TelegramUser) => {
      try {
        const payload = serializeTelegramPayload(user);
        await onAuthRef.current(payload);
      } catch (err) {
        console.error("Failed to process Telegram Auth callback", err);
      }
    };

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      
      const script = document.createElement("script");
      script.src = TELEGRAM_WIDGET_SCRIPT_URL;
      script.setAttribute("data-telegram-login", TELEGRAM_BOT_NAME);
      script.setAttribute("data-size", config?.size || TELEGRAM_WIDGET_CONFIG.size);
      script.setAttribute("data-radius", config?.radius || TELEGRAM_WIDGET_CONFIG.radius);
      script.setAttribute("data-request-access", config?.requestAccess || TELEGRAM_WIDGET_CONFIG.requestAccess);
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.async = true;

      containerRef.current.appendChild(script);
    }

    return () => {
      const extWindow = window as unknown as ExtendedWindow;
      if (extWindow.onTelegramAuth) {
        delete extWindow.onTelegramAuth;
      }
    };
  }, [containerRef, config]);

  return { error, botName: TELEGRAM_BOT_NAME };
}

/**
 * Options for the unified Telegram Action Controller
 */
export interface UseTelegramActionOptions {
  action: (initData: string) => Promise<AuthResult>;
  onSuccess?: () => void;
  onClose?: () => void;
}

/**
 * Unified controller for handling Telegram actions (Login or Link)
 * Wraps the Server Action in a transition and manages the router refresh.
 */
export function useTelegramActionController({ action, onSuccess, onClose }: UseTelegramActionOptions) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const execute = (initData: string): Promise<AuthResult> => {
    return new Promise((resolve) => {
      startTransition(async () => {
        try {
          const result = await action(initData);
          if (result.success) {
            onClose?.();
            router.refresh();
            onSuccess?.();
            resolve(result);
          } else {
            console.error("[Auth Error] Telegram action rejected:", result.error);
            resolve(result);
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err) || "Internal network error";
          console.error("[Auth Error] Telegram action exception:", msg);
          resolve({ success: false, error: msg });
        }
      });
    });
  };

  return { execute, isPending };
}
