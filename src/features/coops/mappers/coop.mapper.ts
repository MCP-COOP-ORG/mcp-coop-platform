import { CoopResponseDto } from "@/shared/open-api/models";
import { CardData } from "@/shared/ui/components/card";
import { CryptoWalletsProps } from "@/shared/ui/components/crypto-wallets";
import { ProfileContacts } from "@/shared/ui/components/contacts";
import { CoopMemberItem } from "@/shared/ui/components/coop-members";

/**
 * Maps the backend CoopDto structure to the frontend CardData structure.
 * 
 * Extracts unique roles from the members array and injects them as categories
 * so the Card UI renders them automatically in the blue badges area.
 */
export function mapCoopDtoToCardData(dto: CoopResponseDto): CardData {
  // Parse members safely without inventing fake fallback data
  const members: CoopMemberItem[] = (dto.members || []).map((m) => ({
    id: m.id,
    name: m.name,
    avatarUrl: m.avatarUrl || null,
    role: m.role || "",
    isProposer: m.isProposer || false,
  }));

  // Strictly use DB categories as requested
  const mergedCategories = dto.categories || [];

  // Parse wallets safely
  const rawWallets = dto.wallets || {};
  const mappedWallets: CryptoWalletsProps["wallets"] = {};
  
  if (rawWallets.solana) mappedWallets.solana = typeof rawWallets.solana === 'object' ? rawWallets.solana as { address: string; isPrimary?: boolean } : { address: String(rawWallets.solana) };
  if (rawWallets.bitcoin) mappedWallets.bitcoin = typeof rawWallets.bitcoin === 'object' ? rawWallets.bitcoin as { address: string; isPrimary?: boolean } : { address: String(rawWallets.bitcoin) };
  if (rawWallets.ethereum) mappedWallets.ethereum = typeof rawWallets.ethereum === 'object' ? rawWallets.ethereum as { address: string; isPrimary?: boolean } : { address: String(rawWallets.ethereum) };
  if (rawWallets.ton) mappedWallets.ton = typeof rawWallets.ton === 'object' ? rawWallets.ton as { address: string; isPrimary?: boolean } : { address: String(rawWallets.ton) };

  // Parse contacts safely
  const rawContacts = dto.contacts || {};
  const mappedContacts: ProfileContacts = {
    telegram: (rawContacts.telegram as string) || null,
    whatsapp: (rawContacts.whatsapp as string) || null,
    viber: (rawContacts.viber as string) || null,
    phone: (rawContacts.phone as string) || null,
    email: (rawContacts.email as string) || null,
    instagram: (rawContacts.instagram as string) || null,
    facebook: (rawContacts.facebook as string) || null,
    linkedin: (rawContacts.linkedin as string) || null,
  };

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description || "",
    avatarUrl: dto.logoUrl || null,
    categories: mergedCategories,
    contacts: mappedContacts,
    wallets: Object.keys(mappedWallets).length > 0 ? mappedWallets : undefined,
    members: members,
    // Coops don't use skills in the card footer directly (they use members)
    skills: [],
  };
}
