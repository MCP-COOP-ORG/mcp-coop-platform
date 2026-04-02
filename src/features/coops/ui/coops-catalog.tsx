import React from "react";
import { CardCatalog } from "@/shared/ui/components/card-catalog";
import { CatalogType, CATALOG_CONSTANTS } from "@/shared/config/constants/catalog";
import { getCoopsAction } from "../api/get-coops.action";

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
    <CardCatalog
      type={CatalogType.COOP}
      items={data}
      totalItems={total || 0}
      itemHrefPrefix="/coops" // Resolves strictly to detailed page
    />
  );
};
