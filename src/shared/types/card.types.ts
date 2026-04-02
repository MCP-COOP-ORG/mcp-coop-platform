import { ProfileContacts } from "@/shared/ui/components/contacts";
import { CryptoWalletsProps } from "@/shared/ui/components/crypto-wallets";
import { SkillItem } from "@/shared/ui/components/skills";
import { CoopMemberItem } from "@/shared/ui/components/coop-members";

/**
 * Base data for any card rendered in the catalog grid.
 */
export interface BaseCardData {
  id: string;
  name: string;
  avatarUrl?: string | null;
  description?: string;
  categories?: string[];
  contacts?: ProfileContacts;
  wallets?: CryptoWalletsProps["wallets"];
}

/**
 * Specifically tailored for Profile Cards
 */
export interface ProfileCardData extends BaseCardData {
  skills?: SkillItem[];
}

/**
 * Specifically tailored for Coop Cards
 */
export interface CoopCardData extends BaseCardData {
  members?: CoopMemberItem[];
}
