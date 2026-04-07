"use client";

import { Button } from "@/shared/ui/primitives";
import { useAuthModals } from "@/features/auth/context/auth-modals-context";

export function GetStartedButton({ label }: { label: string }) {
  const { loginModal } = useAuthModals();

  return (
    <Button 
      appVariant="primary-action" 
      className="mt-auto px-10 py-6 text-md tracking-wider"
      onPress={loginModal.onOpen}
    >
      {label}
    </Button>
  );
}
