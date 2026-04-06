"use client";

import type { ReactNode } from "react";
import {
  Dropdown as HeroDropdown,
  DropdownTrigger as HeroDropdownTrigger,
  DropdownMenu as HeroDropdownMenu,
  DropdownItem as HeroDropdownItem,
} from "@heroui/react";
import { Link } from "@/core/configs/i18n/routing";

export interface AppDropdownItem {
  key: string;
  label: ReactNode;
  description?: string;
  icon?: ReactNode;
  href?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  isReadOnly?: boolean;
}

export interface AppDropdownProps {
  /** Элемент, по которому кликают (Trigger). Передается просто как вложенный элемент. */
  children: ReactNode;
  /** Массив данных для элементов меню */
  items: AppDropdownItem[];
  /** Колбек на клик по айтему (сработает, если элемент не является ссылкой) */
  onAction?: (key: string) => void;
  placement?: "bottom-end" | "bottom" | "bottom-start" | "left" | "right";
  ariaLabel?: string;
}

/**
 * ── UNIFIED DROPDOWN (Один конфиг, один стиль) ─────────────────────────────
 * Внешняя кастомизация сведена к абсолютному минимуму.
 * Дропдаун всегда выглядит одинаково во всем приложении (тени, радиус,
 * отступы, шрифты, glassmorphism фон).
 */
export const Dropdown = ({
  children,
  items,
  onAction,
  placement = "bottom",
  ariaLabel = "Dropdown menu",
}: AppDropdownProps) => {
  // Жестко зашитые константы стиля для всего проекта
  const ITEM_CLASSES = {
    base: "gap-3 py-2 px-3 transition-colors data-[hover=true]:bg-default-100",
    title: "text-[14px] font-medium text-foreground",
    description: "text-[12px] font-normal text-foreground/60",
  };

  return (
    <HeroDropdown
      placement={placement}
      radius="md"
      shadow="md"
      // Единый жестко зашитый контейнер
      className="bg-background/95 backdrop-blur-md border border-default-200 min-w-[220px] p-1"
    >
      <HeroDropdownTrigger>{children}</HeroDropdownTrigger>

      <HeroDropdownMenu
        aria-label={ariaLabel}
        variant="flat"
        itemClasses={ITEM_CLASSES}
        onAction={(key) => onAction?.(key as string)}
      >
        {items.map((item) => (
          <HeroDropdownItem
            key={item.key}
            textValue={typeof item.label === "string" ? item.label : item.key}
            description={item.description}
            href={item.href}
            as={item.href ? Link : undefined}
            startContent={item.icon}
            color={item.color}
            isReadOnly={item.isReadOnly}
            className="transition-colors"
          >
            {item.label}
          </HeroDropdownItem>
        ))}
      </HeroDropdownMenu>
    </HeroDropdown>
  );
};
