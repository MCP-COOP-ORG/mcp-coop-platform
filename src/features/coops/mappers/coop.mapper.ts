import { CoopDto } from "@/entities/coops/types";
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
export function mapCoopDtoToCardData(dto: Partial<CoopDto> | any): CardData {
  // Parse members safely
  const members: CoopMemberItem[] = Array.isArray(dto?.members) 
    ? dto.members.map((m: any) => ({
        id: m.id || String(Math.random()),
        name: m.name || "Unknown",
        avatarUrl: m.avatarUrl || null,
        role: m.role || "Member",
      }))
    : [];

  // Extract unique roles from members to populate categories
  const aggregatedRolesSet = new Set<string>();
  members.forEach((m) => {
    if (m.role) {
      aggregatedRolesSet.add(m.role);
    }
  });
  
  // Optionally merge provided categories with the extracted roles
  const providedCategories = Array.isArray(dto?.categories) ? dto.categories : [];
  const mergedCategories = Array.from(new Set([...providedCategories, ...Array.from(aggregatedRolesSet)]));

  // Parse wallets safely
  const rawWallets = dto?.wallets || {};
  const mappedWallets: CryptoWalletsProps["wallets"] = {};
  
  if (rawWallets.solana) mappedWallets.solana = typeof rawWallets.solana === 'object' ? rawWallets.solana : { address: rawWallets.solana };
  if (rawWallets.bitcoin) mappedWallets.bitcoin = typeof rawWallets.bitcoin === 'object' ? rawWallets.bitcoin : { address: rawWallets.bitcoin };
  if (rawWallets.ethereum) mappedWallets.ethereum = typeof rawWallets.ethereum === 'object' ? rawWallets.ethereum : { address: rawWallets.ethereum };
  if (rawWallets.ton) mappedWallets.ton = typeof rawWallets.ton === 'object' ? rawWallets.ton : { address: rawWallets.ton };

  // Parse contacts safely
  const rawContacts = dto?.contacts || {};
  const mappedContacts: ProfileContacts = {
    telegram: rawContacts.telegram || null,
    whatsapp: rawContacts.whatsapp || null,
    viber: rawContacts.viber || null,
    phone: rawContacts.phone || null,
    email: rawContacts.email || null,
    instagram: rawContacts.instagram || null,
    facebook: rawContacts.facebook || null,
    linkedin: rawContacts.linkedin || null,
  };

  return {
    id: dto?.id || "unknown-id",
    name: dto?.name || "Unnamed Cooperative",
    description: dto?.description || "",
    avatarUrl: dto?.avatarUrl || null,
    categories: mergedCategories,
    contacts: mappedContacts,
    wallets: Object.keys(mappedWallets).length > 0 ? mappedWallets : undefined,
    members: members,
    // Coops don't use skills in the card footer directly (they use members), 
    // but we can map them if provided just in case.
    skills: Array.isArray(dto?.skills) ? dto.skills : [],
  };
}
