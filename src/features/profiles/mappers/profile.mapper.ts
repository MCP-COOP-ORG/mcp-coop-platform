import { ProfileDto } from "@/entities/profiles/types";
import { CardData } from "@/shared/ui/components/card";
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
export function mapProfileDtoToCardData(dto: Partial<ProfileDto> | any): CardData {
  // Parse skills safely
  const rawSkills: SkillItem[] = Array.isArray(dto?.skills) ? dto.skills : [];

  // Extract unique categories from skills to populate top-level categories
  const extractedCategoriesSet = new Set<string>();
  rawSkills.forEach((skill) => {
    if (skill.category) {
      extractedCategoriesSet.add(skill.category);
    }
  });

  // Optionally merge any explicitly provided categories with the extracted ones
  const providedCategories = Array.isArray(dto?.categories) ? dto.categories : [];
  const mergedCategories = Array.from(new Set([...providedCategories, ...Array.from(extractedCategoriesSet)]));

  // Parse wallets safely (CryptoWallets component handles parsing correctly if we provide the right object shape)
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
    id: dto?.id || `unknown-${Math.random()}`,
    name: dto?.name || "Unnamed Specialist",
    description: dto?.description || "",
    avatarUrl: dto?.avatarUrl || null,
    categories: mergedCategories, // The blue badges are rendered from here!
    contacts: mappedContacts,
    wallets: Object.keys(mappedWallets).length > 0 ? mappedWallets : undefined,
    skills: rawSkills, // Renders the scrolling skills list in the footer
    members: [], // Profiles don't use members in Card
  };
}
