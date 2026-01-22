"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  placement?: "center" | "top" | "top-center" | "bottom" | "bottom-center";
  scrollBehavior?: "inside" | "outside";
  isDismissable?: boolean;
  hideCloseButton?: boolean;
}

export default function AppModal({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
  size = "md",
  placement = "center",
  scrollBehavior = "inside",
  isDismissable = true,
  hideCloseButton = false,
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      placement={placement}
      scrollBehavior={scrollBehavior}
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton}
    >
      <ModalContent>
        {() => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            <ModalBody>
              {children}
            </ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

// Hook для удобного использования модального окна
export function useModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
  };
}
