import type { PaginationMetaDto } from "@/shared/open-api/models";
import type { PaginatedResult } from "./types";

/**
 * Template Method: standardised unwrapping of paginated backend responses.
 *
 * Backend always returns { data: T[], meta: PaginationMetaDto }.
 * This helper delegates item-mapping to the caller, keeping pagination
 * logic in one place — change once, fixed everywhere.
 */
export function mapPaginated<TDto, TDomain>(
  raw: { data?: TDto[]; meta?: PaginationMetaDto } | null | undefined,
  itemMapper: (dto: TDto) => TDomain,
): PaginatedResult<TDomain> {
  const items = raw?.data ?? [];
  const total = raw?.meta?.total ?? items.length;

  return {
    data: items.map(itemMapper),
    total,
  };
}
