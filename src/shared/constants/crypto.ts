export type NetworkKey = "solana" | "bitcoin" | "ethereum" | "ton";

export const NETWORK_AVATARS: Record<NetworkKey, string> = {
  solana: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  bitcoin: "https://cdn.simpleicons.org/bitcoin/F7931A",
  ethereum: "https://cdn.simpleicons.org/ethereum/3C3C3D",
  ton: "https://cdn.simpleicons.org/ton/0098EA",
};

/**
 * Supported blockchain network keys for wallet mapping.
 * Add new networks here — map-wallets.ts will pick them up automatically.
 */
export const SUPPORTED_NETWORKS: readonly NetworkKey[] = [
  "solana",
  "bitcoin",
  "ethereum",
  "ton",
] as const;

/**
 * Wallet entry field keys used in backend response DTOs.
 * All string access to wallet objects MUST use these constants.
 */
export const WALLET_KEYS = {
  address: "address",
  isPrimary: "isPrimary",
} as const;
