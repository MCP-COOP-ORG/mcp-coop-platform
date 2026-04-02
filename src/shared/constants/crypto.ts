export type NetworkKey = "solana" | "bitcoin" | "ethereum" | "ton";

export const NETWORK_AVATARS: Record<NetworkKey, string> = {
  solana: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  bitcoin: "https://cdn.simpleicons.org/bitcoin/F7931A",
  ethereum: "https://cdn.simpleicons.org/ethereum/3C3C3D",
  ton: "https://cdn.simpleicons.org/ton/0098EA",
};
