"use client";

import { createContext, useContext } from "react";
import type { ModalControls } from "@/features/auth/context/auth-modals-context";

export interface EditProfileContextType {
  editProfileModal: ModalControls;
}

export const EditProfileContext = createContext<EditProfileContextType | null>(null);

export function useEditProfileModal(): EditProfileContextType {
  const context = useContext(EditProfileContext);
  if (!context) {
    throw new Error("useEditProfileModal must be used within an EditProfileProvider");
  }
  return context;
}
