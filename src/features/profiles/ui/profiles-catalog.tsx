import React from "react";
import { CardCatalog } from "@/shared/ui/components/card-catalog";
import { CatalogType, CATALOG_CONSTANTS } from "@/shared/config/constants/catalog";
import { getProfilesAction } from "../api/get-profiles.action";

export interface ProfilesCatalogProps {
  page: number;
}

/**
 * Smart Container (Feature Vertical Slice UI)
 * 
 * Fetches data asynchronously from the generic API layer, completely isolating
 * the routing page and the dumb CardCatalog from data logistics for Members.
 */
export const ProfilesCatalog = async ({ page }: ProfilesCatalogProps) => {
  // Triggers the Orval Server Action
  const { data, total } = await getProfilesAction(page, CATALOG_CONSTANTS.ITEMS_PER_PAGE);

  // Fallback rendering handled smoothly by the CardCatalog component
  // We seamlessly map the URL routing to the raw fetched item ID
  return (
    <CardCatalog
      type={CatalogType.PROFILE}
      items={data}
      totalItems={total || 0}
      itemHrefPrefix="/members" // Resolves strictly to detailed page
    />
  );
};
