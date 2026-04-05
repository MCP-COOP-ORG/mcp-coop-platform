"use server";

import { profilesControllerFindAll } from "@/shared/open-api/profiles/profiles";
import { mapProfileCardDto, withPaginatedAction } from "@/shared/mappers";

/**
 * Server Action: fetch paginated profiles list.
 * Decorator HOF eliminates boilerplate — mapping and error handling are centralised.
 */
export const getProfilesAction = withPaginatedAction(
  profilesControllerFindAll,
  mapProfileCardDto,
  "getProfilesAction",
);
