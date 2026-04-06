"use client";

import { useModal, Modal } from "@/shared/ui/primitives";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/configs/i18n/routing";
import dynamic from "next/dynamic";
import AuthForm from "./auth-form";
import { AuthModalsContext } from "../context/auth-modals-context";
import { telegramAuthAction } from "../actions";
import { useTelegramActionController } from "../hooks/use-telegram";

// Ленивая загрузка Telegram-модалки
const LazyTelegramAuthModal = dynamic(
  () => import("./telegram-auth-modal").then(mod => mod.TelegramAuthModal),
  { ssr: false }
);

export function AuthModalsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const tHeader = useTranslations("Header");
  
  const loginModal = useModal();
  const telegramModal = useModal();

  const handleAuthSuccess = () => {
    loginModal.onClose();
    router.refresh();
  };

  const { execute: handleTelegramLink, isPending: isTelegramActionPending } = useTelegramActionController({
    action: telegramAuthAction,
    onClose: telegramModal.onClose,
  });

  return (
    <AuthModalsContext.Provider
      value={{
        loginModal,
        telegramModal,
      }}
    >
      {children}

      {/* Модалка логина */}
      <Modal
        isOpen={loginModal.isOpen}
        onOpenChange={(open) => { if (!open) loginModal.onClose(); }}
        title={tHeader("welcome")}
        size="md"
      >
        <AuthForm onSuccess={handleAuthSuccess} />
      </Modal>

      {/* Модалка Telegram */}
      {telegramModal.isOpen && (
        <LazyTelegramAuthModal
          isOpen={telegramModal.isOpen}
          onOpenChange={(open) => { if (!open) telegramModal.onClose(); }}
          title={tHeader("linkTelegram")}
          onAuth={handleTelegramLink}
          isPending={isTelegramActionPending}
        />
      )}
    </AuthModalsContext.Provider>
  );
}
