import type { MappedContacts, MappedWallets } from "@/shared/mappers/primitives/types";

// ─────────────────────────────────────────────────────────────────────────────
// Coop Member — used in both card and full views
// Maps from: CoopMemberResponseDto
// ─────────────────────────────────────────────────────────────────────────────
export interface CoopMemberData {
  id: string;
  onChainId: string;
  name: string;
  avatarUrl: string | null;
  isProposer: boolean;
  /** Platform profile UUID — null if wallet not linked to any profile */
  profileId: string | null;
  /** Primary competence category derived from profile skills */
  competence: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Coop Card — used in list/catalog views
// Maps from: CoopResponseDto (via coopsControllerFindAll)
// ─────────────────────────────────────────────────────────────────────────────
export interface CoopCardData {
  id: string;
  onChainId: string;
  name: string;
  description: string;
  avatarUrl: string | null;
  categories: string[];
  contacts: MappedContacts;
  wallets: MappedWallets;
  website: string | null;
  members: CoopMemberData[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Coop Presentation Slide
// Maps from: CoopPresentationSlideDto
// ─────────────────────────────────────────────────────────────────────────────
export interface CoopSlideData {
  id: string;
  order: number;
  title: string | null;
  description: string | null;
  mediaUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Coop Full — used in detail cooperative pages
// Maps from: CoopFullResponseDto (via coopsControllerFindOne)
// ─────────────────────────────────────────────────────────────────────────────
export interface CoopFullData {
  id: string;
  onChainId: string;
  status: string;
  name: string;
  categories: string[];
  contacts: MappedContacts;
  wallets: MappedWallets;
  website: string | null;
  logoUrl: string | null;
  rating: number;
  onChainCreatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  members: CoopMemberData[];
  shortDescription: string | null;
  /** Rich JSON description from backend */
  description: Record<string, unknown> | null;
  presentationSlides: CoopSlideData[];
}
