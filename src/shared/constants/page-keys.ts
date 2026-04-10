/**
 * Keys used for page routing and fetching JSON schema contents.
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
