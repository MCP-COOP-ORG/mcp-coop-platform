"use server";

import { coopsControllerFindAll } from "@/shared/open-api/coops/coops";
import { mapCoopCardDto, withPaginatedAction } from "@/shared/mappers";

/**
 * Server Action: fetch paginated cooperatives list.
 * Decorator HOF eliminates boilerplate — mapping and error handling are centralised.
 */
export const getCoopsAction = withPaginatedAction(
  coopsControllerFindAll,
  mapCoopCardDto,
  "getCoopsAction",
);
