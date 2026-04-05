import type { ProfileResponseDto } from "@/shared/open-api/models";
import type { ProfileCardData } from "@/entities/profiles/types";
import { mapContacts } from "../primitives/map-contacts";
import { mapWallets } from "../primitives/map-wallets";
import { mapSkills } from "../primitives/map-skills";

/**
 * Adapter: ProfileResponseDto → ProfileCardData
 *
 * Used in the profiles catalog list (profilesControllerFindAll).
 * Categories are derived from skills — no separate backend field needed.
 */
export function mapProfileCardDto(dto: ProfileResponseDto): ProfileCardData {
  const { skills, categories } = mapSkills(dto.skills);

  return {
    id: dto.id,
    name: dto.fullName ?? dto.username ?? dto.email ?? dto.blockchainAccount ?? "",
    avatarUrl: dto.avatarUrl ?? null,
    description: dto.description ?? "",
    categories,
    skills,
    contacts: mapContacts(dto.contacts as Record<string, unknown> | undefined),
    wallets: mapWallets(dto.wallets as Record<string, unknown> | undefined),
    blockchainAccount: dto.blockchainAccount ?? null,
  };
}
