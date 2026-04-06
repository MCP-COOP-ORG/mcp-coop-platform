"use client";

import React from "react";
import { Modal } from "@/shared/ui/primitives";
import { TelegramLoginWidget } from "@/features/auth/components/telegram-login-widget";
import { TelegramAuthModalProps } from "@/features/auth/types";

export function TelegramAuthModal({ isOpen, onOpenChange, title, onAuth, isPending }: TelegramAuthModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} title={title} size="md">
      <div className="py-4">
        <TelegramLoginWidget onAuth={onAuth} isLoading={isPending} />
      </div>
    </Modal>
  );
}
