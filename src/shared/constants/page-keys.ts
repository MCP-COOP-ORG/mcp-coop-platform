/**
 * Page keys used by PageContentLayout to fetch content from Prisma.
 * Must match the `key` field in the PageContent table.
 */
export const PAGE_KEYS = {
  home: "home",
  docs: "docs",
  coops: "coops",
  members: "members",
  contactUs: "contact-us",
  blockchainStatus: "blockchain-status",
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];
