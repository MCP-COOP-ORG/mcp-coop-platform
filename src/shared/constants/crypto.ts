export type NetworkKey = "solana" | "bitcoin" | "ethereum" | "ton";

export const SUPPORTED_NETWORKS: readonly NetworkKey[] = [
  "solana",
  "bitcoin",
  "ethereum",
  "ton",
] as const;

export const WALLET_KEYS = {
  address: "address",
  isPrimary: "isPrimary",
} as const;
