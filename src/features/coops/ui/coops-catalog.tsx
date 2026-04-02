import React from "react";
import { CardCatalog } from "@/shared/ui/components/card-catalog";
import { CATALOG_CONSTANTS } from "@/shared/constants/catalog";
import { getCoopsAction } from "../api/get-coops.action";
import { CoopCard } from "./coop-card";

export interface CoopsCatalogProps {
  page: number;
}

/**
 * Smart Container (Feature Vertical Slice UI)
 * 
 * Fetches data asynchronously from the generic API layer, completely isolating
 * the routing page and the dumb CardCatalog from data logistics.
 */
export const CoopsCatalog = async ({ page }: CoopsCatalogProps) => {
  // Triggers the Orval Server Action
  const { data, total } = await getCoopsAction(page, CATALOG_CONSTANTS.ITEMS_PER_PAGE);

  // Fallback rendering handled smoothly by the CardCatalog component
  // We seamlessly map the URL routing to the raw fetched item ID
  return (
    <CardCatalog totalItems={total || 0}>
      {data.map((item, index) => (
        <CoopCard key={item.id || index} item={item} href={`/coops/${item.id}`} />
      ))}
    </CardCatalog>
  );
};
