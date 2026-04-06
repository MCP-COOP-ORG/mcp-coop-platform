"use client";

import { forwardRef } from "react";
import { Button as HeroButton, ButtonProps as HeroButtonProps } from "@heroui/react";
import { ChevronDown } from "lucide-react";

/**
 * Семантические варианты кнопок для всего приложения.
 * OCP: Чтобы добавить новый тип кнопки, добавляем его сюда в union и в switch,
 * не меняя потребителей.
 */
export type AppButtonVariant =
  | "primary-action"  // Главная кнопка (синяя, solid)
  | "danger-action"   // Деструктивное действие (красная, flat)
  | "success-action"  // Успешное действие или статус (зеленая, flat)
  | "ghost"           // Простая ненавязчивая кнопка (bordered/light)
  | "icon-only"       // Кнопка-иконка (круглая, фиксированный размер, скрытый фокус)
  | "nav-dropdown";   // Прозрачная кнопка для навигации с Dropdown

export interface ButtonProps extends Omit<HeroButtonProps, "variant" | "color"> {
  appVariant?: AppButtonVariant;
  isActive?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ appVariant = "primary-action", className = "", isActive, children, ...props }, ref) => {
    // Единый базовый класс для фокуса (a11y)
    const baseFocusClasses = "data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0";

    let mappedProps: Partial<HeroButtonProps> = {};
    let customClassName = "";

    switch (appVariant) {
      case "primary-action":
        mappedProps = { color: "primary", variant: "solid" };
        break;

      case "danger-action":
        mappedProps = { color: "danger", variant: "flat" };
        break;

      case "success-action":
        mappedProps = { color: "success", variant: "flat" };
        break;

      case "ghost":
        mappedProps = { variant: "bordered" };
        break;

      case "icon-only":
        mappedProps = { isIconOnly: true, variant: "bordered", radius: "full" };
        customClassName = "!h-8 !w-8 !min-w-8 !p-0 !border-1 !border-foreground";
        break;

      case "nav-dropdown":
        mappedProps = {
          disableRipple: true,
          variant: "light",
          radius: "sm",
          endContent: (
            <ChevronDown className="w-[14px] h-[14px] scale-x-[0.85] text-foreground transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-data-[open=true]:rotate-180" />
          ),
        };
        customClassName = `group p-0 bg-transparent data-[hover=true]:bg-transparent uppercase tracking-wider text-medium hover:text-foreground transition-colors ${
          isActive ? "font-normal text-primary" : "font-light"
        }`;
        break;
    }

    // trim() избавляет от пробелов в начале/конце при пустых кастомных классах
    const finalClassName = `${baseFocusClasses} ${customClassName} ${className}`.trim();

    return (
      <HeroButton ref={ref} className={finalClassName} {...mappedProps} {...props}>
        {children}
      </HeroButton>
    );
  }
);

Button.displayName = "Button";
