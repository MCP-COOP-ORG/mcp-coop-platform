import { SUPPORTED_NETWORKS, WALLET_KEYS } from "@/shared/constants/crypto";
import type { NetworkKey } from "@/shared/constants/crypto";
import type { MappedWalletEntry, MappedWallets } from "./types";

/**
 * Adapter: maps the backend open-ended wallets dict { [key: string]: unknown }
 * to a strict MappedWallets shape consumed by the CryptoWallets UI component.
 *
 * Only known network keys are mapped; unsupported networks are discarded.
 * Updating supported networks requires changing only SUPPORTED_NETWORKS in crypto.ts.
 */
export function mapWallets(
  raw: Record<string, unknown> | null | undefined,
): MappedWallets {
  if (!raw) return {};

  const result: MappedWallets = {};

  for (const key of SUPPORTED_NETWORKS) {
    const entry = raw[key];
    if (!entry || typeof entry !== "object") continue;

    const record = entry as Record<string, unknown>;
    const address = typeof record[WALLET_KEYS.address] === "string"
      ? record[WALLET_KEYS.address] as string
      : null;
    if (!address) continue;

    const wallet: MappedWalletEntry = { address };
    if (typeof record[WALLET_KEYS.isPrimary] === "boolean") {
      wallet.isPrimary = record[WALLET_KEYS.isPrimary] as boolean;
    }
    result[key as NetworkKey] = wallet;
  }

  return result;
}
