"use client";

import type { ReactNode } from "react";
import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalProps as HeroModalProps,
} from "@heroui/react";

// Re-export raw primitives for cases that need fine-grained control
export { ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure };
export { useDisclosure as useModal };

/**
 * AppModal — составная обёртка над HeroUI Modal.
 * Инкапсулирует стандартную структуру ModalContent → ModalHeader → ModalBody → ModalFooter,
 * чтобы потребители не дублировали этот шаблон повсеместно.
 */
export interface ModalProps extends Omit<HeroModalProps, "children"> {
  /** Заголовок модалки (рендерится в ModalHeader, если передан) */
  title?: string;
  /** Контент — будет вставлен в ModalBody */
  children: ReactNode;
  /** Опциональный футер — будет вставлен в ModalFooter */
  footer?: ReactNode;
}

export const Modal = ({
  title,
  children,
  footer,
  size = "md",
  placement = "center",
  scrollBehavior = "inside",
  isDismissable = true,
  hideCloseButton = false,
  ...props
}: ModalProps) => {
  return (
    <HeroModal
      size={size}
      placement={placement}
      scrollBehavior={scrollBehavior}
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton}
      {...props}
    >
      <ModalContent>
        {() => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1 items-center text-center">
                {title}
              </ModalHeader>
            )}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
};
