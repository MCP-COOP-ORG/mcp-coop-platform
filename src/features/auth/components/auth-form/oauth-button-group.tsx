"use client";

import { useTransition } from "react";
import { Button } from "@/shared/ui/primitives";
import { GitHub, Google, Telegram } from "@/shared/ui/icons";
import { authFormButtons } from "@/shared/constants/form";
import { OAUTH_PROVIDERS } from "@/features/auth/constants";
import type { OAuthProvider } from "@/features/auth/constants";
import { oauthLogin } from "@/features/auth/actions";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OAuthButtonGroupProps {
  isDisabled: boolean;
  onTelegramOpen: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * OAuthButtonGroup — renders GitHub, Google, Telegram OAuth buttons.
 * Extracted from the monolith to respect SRP.
 * Manages its own OAuth transition state internally.
 */
export function OAuthButtonGroup({ isDisabled, onTelegramOpen }: OAuthButtonGroupProps) {
  const t = useTranslations("Form");
  const [isOAuthPending, startOAuthTransition] = useTransition();

  const handleOAuthLogin = (provider: OAuthProvider) => {
    startOAuthTransition(() => {
      oauthLogin(provider);
    });
  };

  const allDisabled = isDisabled || isOAuthPending;

  return (
    <div className="flex gap-2">
      <Button
        appVariant="icon-only"
        onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GITHUB)}
        isDisabled={allDisabled}
        aria-label={t(authFormButtons.loginWithGithub)}
      >
        <GitHub className="w-5 h-5 flex-shrink-0" />
      </Button>
      <Button
        appVariant="icon-only"
        onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GOOGLE)}
        isDisabled={allDisabled}
        aria-label={t(authFormButtons.loginWithGoogle)}
      >
        <Google className="w-5 h-5 flex-shrink-0" />
      </Button>
      <Button
        appVariant="icon-only"
        onPress={onTelegramOpen}
        isDisabled={allDisabled}
        aria-label={t(authFormButtons.loginWithTelegram)}
      >
        <Telegram className="w-5 h-5" />
      </Button>
    </div>
  );
}
