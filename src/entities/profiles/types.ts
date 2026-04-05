import type { MappedContacts, MappedWallets } from "@/shared/mappers/primitives/types";
import type { SkillItem } from "@/shared/ui/components/skills";

// ─────────────────────────────────────────────────────────────────────────────
// Profile Card — used in list/catalog views
// Maps from: ProfileResponseDto (via profilesControllerFindAll)
// ─────────────────────────────────────────────────────────────────────────────
export interface ProfileCardData {
  id: string;
  name: string;
  avatarUrl: string | null;
  description: string;
  categories: string[];
  skills: SkillItem[];
  contacts: MappedContacts;
  wallets: MappedWallets;
  blockchainAccount: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile Experience entry
// Maps from: ProfileExperienceDto
// ─────────────────────────────────────────────────────────────────────────────
export interface ProfileExperienceData {
  id: string;
  companyName: string;
  projectRole: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile Full — used in detail profile pages
// Maps from: ProfileFullResponseDto (via profilesControllerFindOne)
// ─────────────────────────────────────────────────────────────────────────────
export interface ProfileFullData {
  id: string;
  fullName: string | null;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
  /** Computed: fullName ?? username ?? email ?? blockchainAccount ?? 'Anonymous' */
  displayName: string;
  rating: number;
  skills: SkillItem[];
  categories: string[];
  contacts: MappedContacts;
  wallets: MappedWallets;
  blockchainAccount: string | null;
  shortDescription: string | null;
  /** Rich JSON description from backend */
  description: Record<string, unknown> | null;
  location: string | null;
  timezone: string | null;
  availabilityStatus: string | null;
  experiences: ProfileExperienceData[];
}

// ─────────────────────────────────────────────────────────────────────────────
// My Profile (session) — used in layout / header
// Maps from: MeResponseDto (via myProfileControllerFindMe)
// ─────────────────────────────────────────────────────────────────────────────
export interface MyProfileData {
  id: string;
  fullName: string | null;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
  /** Computed: fullName ?? username ?? email ?? blockchainAccount ?? 'Anonymous' */
  displayName: string;
  lastActiveWorkspaceId: string | null;
  blockchainAccount: string | null;
}
