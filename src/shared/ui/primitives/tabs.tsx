"use client";

import { forwardRef } from "react";
import { Tabs as HeroTabs, Tab as HeroTab, TabsProps as HeroTabsProps } from "@heroui/react";

export type AppTabsVariant = "default" | "workspace";

export interface TabsProps<T extends object = object>
  extends Omit<HeroTabsProps<T>, "classNames"> {
  appVariant?: AppTabsVariant;
}

/**
 * Generic `forwardRef` doesn't natively support generic type parameters in TypeScript.
 * The standard solution is to cast the final export — the inner function is fully typed.
 */
function TabsInner<T extends object>(
  { appVariant = "default", className = "", ...props }: TabsProps<T>,
  ref: React.Ref<HTMLDivElement>
) {
  let customClassNames: HeroTabsProps<T>["classNames"] = {};

  if (appVariant === "workspace") {
    customClassNames = {
      base: "w-full flex justify-center",
      tabList: "mx-auto",
    };
  }

  return (
    <HeroTabs<T>
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      classNames={customClassNames}
      {...props}
    />
  );
}

// Cast is required: TypeScript's `forwardRef` has no generic overload.
// The inner function `TabsInner` is fully typed — this is the idiomatic pattern.
export const Tabs = forwardRef(TabsInner) as <T extends object>(
  props: TabsProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

(Tabs as { displayName?: string }).displayName = "Tabs";

export const Tab = HeroTab;
