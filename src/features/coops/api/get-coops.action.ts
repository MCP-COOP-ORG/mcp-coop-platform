"use server";

import { coopsControllerFindAll } from "@/shared/open-api/coops/coops";
import { mapPaginated, mapCoopCardDto } from "@/shared/mappers";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import type { PaginatedResult } from "@/shared/mappers/primitives/types";
import type { CoopCardData } from "@/entities/coops/types";
import type { CoopsControllerFindAllParams } from "@/shared/open-api/models";

export async function getCoopsAction(
  page: number = 1,
  limit: number = 100,
  params?: Omit<CoopsControllerFindAllParams, "page" | "limit">
): Promise<PaginatedResult<CoopCardData>> {
  try {
    const response = await coopsControllerFindAll({ page, limit, ...params });
    return mapPaginated(response.data, mapCoopCardDto);
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[getCoopsAction] Error:", error);
    return { data: [], total: 0 };
  }
}
