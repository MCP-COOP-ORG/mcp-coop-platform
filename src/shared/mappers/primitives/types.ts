import type { PaginationMetaDto } from "@/shared/open-api/models";

// ─────────────────────────────────────────────────────────────────────────────
// Re-export PaginationMetaDto so primitives stay self-contained
// ─────────────────────────────────────────────────────────────────────────────
export type { PaginationMetaDto };

// ─────────────────────────────────────────────────────────────────────────────
// Generic paginated result — used by withPaginatedAction and mapPaginated
// ─────────────────────────────────────────────────────────────────────────────
export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalised contacts — backend sends { [key: string]: unknown }
// We map to a strict set of known keys; unknown keys are safely ignored
// ─────────────────────────────────────────────────────────────────────────────
export interface MappedContacts {
  telegram: string | null;
  whatsapp: string | null;
  viber: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalised wallet entry
// ─────────────────────────────────────────────────────────────────────────────
export interface MappedWalletEntry {
  address: string;
  isPrimary?: boolean;
}

export interface MappedWallets {
  solana?: MappedWalletEntry;
  bitcoin?: MappedWalletEntry;
  ethereum?: MappedWalletEntry;
  ton?: MappedWalletEntry;
}
