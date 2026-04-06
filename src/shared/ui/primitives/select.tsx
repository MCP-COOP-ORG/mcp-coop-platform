"use client";

import { forwardRef } from "react";
import { Select as HeroSelect, SelectItem, SelectProps as HeroSelectProps } from "@heroui/react";

export type AppSelectVariant = "language-selector" | "default";

export interface SelectProps<T extends object = object>
  extends Omit<HeroSelectProps<T>, "variant" | "classNames"> {
  appVariant?: AppSelectVariant;
}

/**
 * Generic `forwardRef` doesn't natively support generic type parameters in TypeScript.
 * The standard solution is to cast the final export — the inner function is fully typed.
 */
function SelectInner<T extends object>(
  { appVariant = "default", className = "", ...props }: SelectProps<T>,
  ref: React.Ref<HTMLSelectElement>
) {
  let customClassNames: HeroSelectProps<T>["classNames"] = {};
  let mappedProps: Partial<HeroSelectProps<T>> = {};

  if (appVariant === "language-selector") {
    mappedProps = { variant: "bordered", radius: "full", popoverProps: { placement: "bottom-end" } };
    customClassNames = {
      base: "w-8",
      trigger: "h-8 min-h-8 w-8 min-w-8 !p-0 !border-1 !border-foreground",
      innerWrapper: "w-full h-full justify-center !pt-0 !pb-0 !pl-0 !pr-0 !gap-0",
      selectorIcon: "hidden w-0 h-0",
      value: "flex justify-center items-center w-full h-full !pr-0 !pl-0",
      popoverContent: "w-[44px] min-w-[44px] !p-1",
      listbox: "p-0 flex flex-col items-center gap-2 [&_svg]:hidden",
    };
  }

  return (
    <HeroSelect<T>
      ref={ref as React.Ref<HTMLSelectElement>}
      className={className}
      classNames={customClassNames}
      {...mappedProps}
      {...props}
    />
  );
}

// Cast is required: TypeScript's `forwardRef` has no generic overload.
// The inner function `SelectInner` is fully typed — this is the idiomatic pattern.
export const Select = forwardRef(SelectInner) as <T extends object>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement;

(Select as { displayName?: string }).displayName = "Select";

export { SelectItem };
