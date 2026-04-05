import type { PaginationMetaDto } from "@/shared/open-api/models";
import type { PaginatedResult } from "./types";
import { mapPaginated } from "./map-paginated";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";


type PaginatedOrvalResponse<TDto> = {
  data: { data?: TDto[]; meta?: PaginationMetaDto };
  status: number;
};

type PaginatedFetcher<TDto> = (params: {
  page: number;
  limit: number;
}) => Promise<PaginatedOrvalResponse<TDto>>;

/**
 * Decorator HOF: wraps any Orval paginated fetcher into a clean Server Action.
 *
 * Eliminates boilerplate in every paginated action:
 *   - Unwraps Orval response envelope
 *   - Delegates item mapping via mapPaginated (Template Method)
 *   - Passes through Next.js NEXT_REDIRECT errors (required for interceptors)
 *   - Returns empty fallback on other errors instead of crashing
 *
 * Usage:
 *   export const getProfilesAction = withPaginatedAction(
 *     profilesControllerFindAll,
 *     mapProfileCardDto,
 *   );
 */
export function withPaginatedAction<TDto, TDomain>(
  fetcher: PaginatedFetcher<TDto>,
  itemMapper: (dto: TDto) => TDomain,
  debugLabel?: string,
): (page: number, limit: number) => Promise<PaginatedResult<TDomain>> {
  return async (page: number, limit: number): Promise<PaginatedResult<TDomain>> => {
    try {
      const response = await fetcher({ page, limit });
      return mapPaginated(response.data, itemMapper);
    } catch (error: unknown) {
      // Next.js redirects must propagate — interceptors rely on this
      if (isNextRedirect(error)) throw error;

      console.error(
        `[withPaginatedAction${debugLabel ? `:${debugLabel}` : ""}] Error:`,
        error,
      );
      return { data: [], total: 0 };
    }
  };
}

