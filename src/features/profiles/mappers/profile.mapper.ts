import { ProfileResponseDto } from "@/shared/open-api/models";
import { ProfileCardData } from "@/shared/types/card.types";
import { CryptoWalletsProps } from "@/shared/ui/components/crypto-wallets";
import { ProfileContacts } from "@/shared/ui/components/contacts";
import { SkillItem } from "@/shared/ui/components/skills";

/**
 * Maps the backend ProfileDto structure to the frontend CardData structure.
 * 
 * Automatically iterates through the array of skills and extracts all unique `category` 
 * values (e.g. "Frontend", "Backend") into the root `categories` array so the Card
 * renders the blue badges above the content autonomously.
 */
export function mapProfileDtoToCardData(dto: ProfileResponseDto): ProfileCardData {
  // Parse skills safely, extracting iconUrl from the new DTO
  const rawSkills: SkillItem[] = (dto.skills || []).map((skill) => ({
    id: skill.id,
    name: skill.name,
    category: skill.category,
    iconUrl: skill.iconUrl || null,
  }));

  // Extract unique categories from skills to populate top-level categories
  const extractedCategoriesSet = new Set<string>();
  rawSkills.forEach((skill) => {
    if (skill.category) {
      extractedCategoriesSet.add(skill.category);
    }
  });

  // Optionally merge any explicitly provided categories with the extracted ones
  const providedCategories = dto.categories || [];
  const mergedCategories = Array.from(new Set([...providedCategories, ...Array.from(extractedCategoriesSet)]));

  // Parse wallets safely (CryptoWallets component handles parsing correctly if we provide the right object shape)
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
    name: dto.fullName || dto.username || "",
    description: dto.description || "",
    avatarUrl: dto.avatarUrl || null,
    categories: mergedCategories, // The blue badges are rendered from here!
    contacts: mappedContacts,
    wallets: Object.keys(mappedWallets).length > 0 ? mappedWallets : undefined,
    skills: rawSkills, // Renders the scrolling skills list in the footer
  };
}
