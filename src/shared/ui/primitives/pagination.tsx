"use client";

import { forwardRef } from "react";
import { Pagination as HeroPagination, PaginationProps as HeroPaginationProps } from "@heroui/react";

export type AppPaginationVariant = "default";

export interface PaginationProps extends HeroPaginationProps {
  appVariant?: AppPaginationVariant;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ appVariant: _appVariant = "default", className = "", ...props }, ref) => {
    return <HeroPagination ref={ref} className={className} {...props} />;
  }
);
Pagination.displayName = "Pagination";
