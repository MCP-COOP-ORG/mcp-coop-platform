// =========================================================================
// Domain Types for Profiles / Specialists (based on expected Backend Schema)
// =========================================================================

export interface ProfileWalletDto {
  address: string;
  isPrimary?: boolean;
}

export interface ProfileSkillDto {
  id: string;
  name: string;
  category: string;
}

export interface ProfileDto {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string | null;
  categories?: string[];
  skills?: ProfileSkillDto[];
  contacts?: {
    telegram?: string | null;
    whatsapp?: string | null;
    viber?: string | null;
    phone?: string | null;
    email?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    linkedin?: string | null;
    [key: string]: string | undefined | null; // Extensible for other contacts
  };
  wallets?: {
    solana?: ProfileWalletDto;
    bitcoin?: ProfileWalletDto;
    ethereum?: ProfileWalletDto;
    ton?: ProfileWalletDto;
    [key: string]: ProfileWalletDto | undefined; // Extensible
  };
}
