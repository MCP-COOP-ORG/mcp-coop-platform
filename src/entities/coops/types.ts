// =========================================================================
// Domain Types for Cooperatives (based on expected Backend API Schema)
// =========================================================================

export interface CoopMemberDto {
  id: string;
  name: string;
  avatarUrl: string | null;
  role: string;
}

export interface CoopWalletDto {
  address: string;
  isPrimary?: boolean;
}

export interface CoopDto {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string | null;
  categories?: string[];
  contacts?: {
    telegram?: string | null;
    email?: string | null;
    whatsapp?: string | null;
    linkedin?: string | null;
    [key: string]: string | undefined | null; // Extensible for other contacts
  };
  wallets?: {
    solana?: CoopWalletDto;
    ethereum?: CoopWalletDto;
    bitcoin?: CoopWalletDto;
    ton?: CoopWalletDto;
    [key: string]: CoopWalletDto | undefined; // Extensible
  };
  members?: CoopMemberDto[];
}

/**
 * Common shape for paginated backend responses on this backend.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
