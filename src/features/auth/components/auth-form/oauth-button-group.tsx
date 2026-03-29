"use client";

import { useTransition } from "react";
import { Button } from "@/shared/ui/components/hero-ui";
import { GithubIcon, GoogleIcon, TelegramIcon } from "@/shared/ui/icons/social";
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
        isIconOnly
        radius="full"
        variant="bordered"
        onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GITHUB)}
        isDisabled={allDisabled}
        className="data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
        aria-label={t(authFormButtons.loginWithGithub)}
      >
        <GithubIcon className="w-5 h-5" />
      </Button>
      <Button
        isIconOnly
        radius="full"
        variant="bordered"
        onPress={() => handleOAuthLogin(OAUTH_PROVIDERS.GOOGLE)}
        isDisabled={allDisabled}
        className="data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
        aria-label={t(authFormButtons.loginWithGoogle)}
      >
        <GoogleIcon className="w-5 h-5" />
      </Button>
      <Button
        isIconOnly
        radius="full"
        variant="bordered"
        onPress={onTelegramOpen}
        isDisabled={allDisabled}
        className="data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0"
        aria-label={t(authFormButtons.loginWithTelegram)}
      >
        <TelegramIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}
