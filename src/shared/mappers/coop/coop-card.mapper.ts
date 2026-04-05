import type { CoopResponseDto, CoopMemberResponseDto } from "@/shared/open-api/models";
import type { CoopCardData, CoopMemberData } from "@/entities/coops/types";
import { mapContacts } from "../primitives/map-contacts";
import { mapWallets } from "../primitives/map-wallets";

function mapCoopMember(dto: CoopMemberResponseDto): CoopMemberData {
  return {
    id: dto.id,
    onChainId: dto.onChainId,
    name: dto.name,
    avatarUrl: dto.avatarUrl ?? null,
    isProposer: dto.isProposer,
    profileId: dto.profileId ?? null,
    competence: dto.competence ?? null,
  };
}

/**
 * Adapter: CoopResponseDto → CoopCardData
 *
 * Used in the cooperatives catalog list (coopsControllerFindAll).
 * profileId is taken directly from DTO — no hardcoded fallback.
 */
export function mapCoopCardDto(dto: CoopResponseDto): CoopCardData {
  return {
    id: dto.id,
    onChainId: dto.onChainId,
    name: dto.name,
    description: dto.description ?? "",
    avatarUrl: dto.logoUrl ?? null,
    categories: dto.categories ?? [],
    contacts: mapContacts(dto.contacts as Record<string, unknown> | undefined),
    wallets: mapWallets(dto.wallets as Record<string, unknown> | undefined),
    website: dto.website ?? null,
    members: (dto.members ?? []).map(mapCoopMember),
  };
}
