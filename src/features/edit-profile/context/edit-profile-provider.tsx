"use client";

import React from "react";
import { useModal } from "@/shared/ui/primitives";
import dynamic from "next/dynamic";
import { EditProfileContext } from "./edit-profile-context";

const LazyEditProfileModal = dynamic<{ isOpen: boolean; onOpenChange: (open: boolean) => void }>(
  () => import("@/features/edit-profile/ui/edit-profile-modal").then(mod => mod.EditProfileModal),
  { ssr: false }
);

export function EditProfileProvider({ children }: { children: React.ReactNode }) {
  const editProfileModal = useModal();

  return (
    <EditProfileContext.Provider value={{ editProfileModal }}>
      {children}
      <LazyEditProfileModal
        isOpen={editProfileModal.isOpen}
        onOpenChange={editProfileModal.onOpenChange}
      />
    </EditProfileContext.Provider>
  );
}
