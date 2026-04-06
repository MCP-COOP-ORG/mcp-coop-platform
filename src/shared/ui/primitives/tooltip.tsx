"use client";

import { Tooltip as HeroTooltip, TooltipProps as HeroTooltipProps } from "@heroui/react";

export type AppTooltipProps = Omit<HeroTooltipProps, "radius" | "shadow">;
// Здесь можно добавить appVariant, если в будущем появятся разные стили (например danger-tooltip).
// Пока все Tooltip(ы) приведены к единому стилю приложения.

/**
 * ── UNIFIED TOOLTIP ────────────────────────────────────────────────────────
 * Во всём приложении тултипы появляются с одинаковой задержкой,
 * имеют одинаковые тени, рамки и фон (glassmorphism).
 */
export const Tooltip = ({ className, delay = 200, closeDelay = 100, ...props }: AppTooltipProps) => {
  return (
    <HeroTooltip
      radius="sm"
      shadow="md"
      delay={delay}
      closeDelay={closeDelay}
      className={`bg-background/95 backdrop-blur-sm border border-default-200 px-3 py-1.5 text-xs font-medium ${
        className ?? ""
      }`.trim()}
      {...props}
    />
  );
};
