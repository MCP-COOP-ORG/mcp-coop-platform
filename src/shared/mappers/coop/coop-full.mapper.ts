import type { CoopFullResponseDto, CoopMemberResponseDto, CoopPresentationSlideDto } from "@/shared/open-api/models";
import type { CoopFullData, CoopMemberData, CoopSlideData } from "@/entities/coops/types";
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

function mapSlide(dto: CoopPresentationSlideDto): CoopSlideData {
  return {
    id: dto.id,
    order: dto.order,
    title: dto.title ?? null,
    description: dto.description ?? null,
    mediaUrl: dto.mediaUrl,
  };
}

/**
 * Adapter: CoopFullResponseDto → CoopFullData
 *
 * Used in the cooperative detail page (coopsControllerFindOne).
 * Handles richer schema: status, onChainId, slides, members with profileId.
 */
export function mapCoopFullDto(dto: CoopFullResponseDto): CoopFullData {
  return {
    id: dto.id,
    onChainId: dto.onChainId,
    status: dto.status,
    name: dto.name,
    categories: dto.categories ?? [],
    contacts: mapContacts(dto.contacts as Record<string, unknown> | undefined),
    wallets: mapWallets(dto.wallets as Record<string, unknown> | undefined),
    website: dto.website ?? null,
    logoUrl: dto.logoUrl ?? null,
    rating: dto.rating,
    onChainCreatedAt: dto.onChainCreatedAt ?? null,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    members: (dto.members ?? []).map(mapCoopMember),
    mission: dto.mission ?? null,
    vision: dto.vision ?? null,
    shortDescription: dto.shortDescription ?? null,
    description: dto.description as Record<string, unknown> | null ?? null,
    presentationSlides: (dto.presentationSlides ?? []).map(mapSlide),
  };
}
