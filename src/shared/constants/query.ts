/**
 * Common Prisma query constants.
 * Reusable sort orders for database queries.
 */
export const SORT_ORDER = {
  asc: "asc",
  desc: "desc",
} as const;

export const DEFAULT_ORDER_BY = {
  newest: { createdAt: SORT_ORDER.desc },
  oldest: { createdAt: SORT_ORDER.asc },
} as const;
