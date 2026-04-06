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
    mappedProps = { variant: "bordered" };
    customClassNames = {
      trigger: "h-10 min-h-10 px-2 w-[72px]",
      value: "flex justify-center",
      popoverContent: "w-[72px] min-w-[72px]",
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
