"use client";

import { createContext, useContext } from "react";

export interface ModalControls {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

export interface AuthModalsContextType {
  loginModal: ModalControls;
  telegramModal: ModalControls;
}

export const AuthModalsContext = createContext<AuthModalsContextType | null>(null);

export function useAuthModals(): AuthModalsContextType {
  const context = useContext(AuthModalsContext);
  if (!context) {
    throw new Error("useAuthModals must be used within an AuthModalsProvider");
  }
  return context;
}
