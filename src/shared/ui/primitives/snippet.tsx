"use client";

import { forwardRef } from "react";
import { Snippet as HeroSnippet, SnippetProps as HeroSnippetProps } from "@heroui/react";

export type AppSnippetVariant = "default";

export interface SnippetProps extends HeroSnippetProps {
  appVariant?: AppSnippetVariant;
}

export const Snippet = forwardRef<HTMLDivElement, SnippetProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroSnippet ref={ref} className={className} {...props} />;
  }
);
Snippet.displayName = "Snippet";
