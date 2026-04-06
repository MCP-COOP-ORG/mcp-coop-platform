"use client";

import React from "react";
import { Pagination } from "@/shared/ui/primitives";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CATALOG_CONSTANTS } from "@/shared/constants/catalog";

export interface CardCatalogProps {
  children?: React.ReactNode;
  totalItems: number;
  className?: string;
}

export const CardCatalog = ({ 
  children,
  totalItems, 
  className = "" 
}: CardCatalogProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // URL-based computed state
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / CATALOG_CONSTANTS.ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Grid rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>

      {/* Pagination rendering */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center py-6 mt-4">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showControls
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default CardCatalog;
