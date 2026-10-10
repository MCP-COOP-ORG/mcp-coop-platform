/**
 * Shared complex CSS styles for the application UI.
 */

export const dashedSeparator = "border-t-[2px] border-dashed border-default-200";

export const blueprintBackgroundStyle = {
  backgroundColor: '#6ba0c0',
  backgroundImage: `
    /* --- Верхняя линейка --- */
    /* СМ (10 мм): высота 30px, шаг 50px */
    repeating-linear-gradient(to right, white 0px, white 2px, transparent 2px, transparent 50px),
    /* ПОЛ-СМ (5 мм): высота 20px, шаг 25px (совпадает с сеткой!) */
    repeating-linear-gradient(to right, white 0px, white 2px, transparent 2px, transparent 25px),
    /* ММ (1 мм): высота 10px, шаг 5px */
    repeating-linear-gradient(to right, white 0px, white 1px, transparent 1px, transparent 5px),

    /* --- Нижняя линейка --- */
    /* СМ (10 мм) */
    repeating-linear-gradient(to right, white 0px, white 2px, transparent 2px, transparent 50px),
    /* ПОЛ-СМ (5 мм) */
    repeating-linear-gradient(to right, white 0px, white 2px, transparent 2px, transparent 25px),
    /* ММ (1 мм) */
    repeating-linear-gradient(to right, white 0px, white 1px, transparent 1px, transparent 5px),

    /* Основная блюпринт-сетка: ячейка 25x25 (ровно полсантиметра) */
    linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
  `,
  backgroundSize: `
    100% 30px, 100% 20px, 100% 10px,
    100% 30px, 100% 20px, 100% 10px,
    25px 25px, 25px 25px
  `,
  backgroundPosition: `
    top left, top left, top left,
    bottom left, bottom left, bottom left,
    top left, top left
  `,
  backgroundRepeat: `
    repeat-x, repeat-x, repeat-x,
    repeat-x, repeat-x, repeat-x,
    repeat, repeat
  `,
  boxShadow: 'inset 0px 10px 20px rgba(0,0,0,0.2), inset 0px -10px 20px rgba(0,0,0,0.2)'
} as const;

/**
 * Returns dynamic Tailwind CSS classes for the bordered article grid based on element position.
 */
export function getArticleCardClasses(idx: number, total: number): string {
  const colStyles = [
    "md:pl-0 md:pr-10 md:border-r-[2px]",
    "md:px-10 md:border-r-[2px]",
    "md:pl-10 md:pr-0 md:border-r-0"
  ][idx % 3];

  const isFirstRow = idx < 3;
  const isLastRow = idx >= total - 3;
  
  const rowStyles = isFirstRow
    ? "md:pt-0 md:pb-10 md:border-b-[2px]"
    : isLastRow
    ? "md:pt-10 md:pb-0 md:border-b-0"
    : "md:py-10 md:border-b-[2px]";

  return [
    "flex flex-col gap-[14px] py-10",
    "border-dashed border-default-200",
    "border-b-[2px] last:border-b-0",
    colStyles,
    rowStyles,
  ].join(" ");
}

/**
 * Shared blueprint card layout constants to adhere to DRY across homepage sections (Team, Projects).
 * Both profile and project cards share identical dimensions, borders, and interaction states.
 */
export const BLUEPRINT_CARD_WIDTH_PX = 288; // 320px reduced by 10% = 288px
export const BLUEPRINT_CARD_GAP_PX = 24; // sm:gap-6
export const BLUEPRINT_CARD_SCROLL_STEP = BLUEPRINT_CARD_WIDTH_PX + BLUEPRINT_CARD_GAP_PX; // 312px

export const blueprintCardClass =
  "w-full max-w-[288px] sm:w-[288px] md:w-[288px] flex-shrink-0 flex flex-col justify-between p-4 border-[2px] border-dashed border-foreground/20 rounded-medium bg-background hover:border-primary/60 transition-all duration-300 group relative";

