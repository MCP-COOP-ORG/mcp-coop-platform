"use client";

import { Pagination } from "@/shared/ui/components/hero-ui";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CATALOG_CONSTANTS, CatalogType } from "@/shared/config/constants/catalog";
import { Link } from "@/core/configs/i18n/routing";
import { Card, CardData } from "@/shared/ui/components/card";
import React from "react";

export type CatalogItemData = CardData;

export interface CardCatalogProps {
  items: CatalogItemData[];
  type: CatalogType | "coop" | "profile";
  totalItems: number;
  className?: string;
  itemHrefPrefix?: string;
}

export const CardCatalog: React.FC<CardCatalogProps> = ({ items, type, totalItems, className = "", itemHrefPrefix }) => {
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
      {/* Grid rendering identical to previous logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => {
          const card = <Card item={item} type={type} />;
          if (itemHrefPrefix) {
            return (
              <Link key={item.id} href={`${itemHrefPrefix}/${item.id}` as any} className="block w-full">
                {card}
              </Link>
            );
          }
          return <React.Fragment key={item.id}>{card}</React.Fragment>;
        })}
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
