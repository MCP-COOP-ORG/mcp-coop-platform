import type { ProfileFullResponseDto, ProfileExperienceDto } from "@/shared/open-api/models";
import type { ProfileFullData, ProfileExperienceData } from "@/entities/profiles/types";
import { mapContacts } from "../primitives/map-contacts";
import { mapWallets } from "../primitives/map-wallets";
import { mapSkills } from "../primitives/map-skills";

function resolveDisplayName(dto: ProfileFullResponseDto): string {
  return dto.fullName ?? dto.username ?? dto.email ?? dto.blockchainAccount ?? "Anonymous";
}

function mapExperience(dto: ProfileExperienceDto): ProfileExperienceData {
  return {
    id: dto.id,
    companyName: dto.companyName,
    projectRole: dto.projectRole,
    startDate: dto.startDate,
    endDate: dto.endDate ?? null,
    description: dto.description ?? null,
  };
}

/**
 * Adapter: ProfileFullResponseDto → ProfileFullData
 *
 * Used in the profile detail page (profilesControllerFindOne).
 * Handles the richer schema: experiences, rich description JSON, availability.
 */
export function mapProfileFullDto(dto: ProfileFullResponseDto): ProfileFullData {
  const { skills, categories } = mapSkills(dto.skills);

  return {
    id: dto.id,
    fullName: dto.fullName ?? null,
    username: dto.username ?? null,
    email: dto.email ?? null,
    avatarUrl: dto.avatarUrl ?? null,
    displayName: resolveDisplayName(dto),
    rating: dto.rating,
    skills,
    categories,
    contacts: mapContacts(dto.contacts as Record<string, unknown> | undefined),
    wallets: mapWallets(dto.wallets as Record<string, unknown> | undefined),
    blockchainAccount: dto.blockchainAccount ?? null,
    shortDescription: dto.shortDescription ?? null,
    description: dto.description as Record<string, unknown> | null ?? null,
    location: dto.location ?? null,
    timezone: dto.timezone ?? null,
    availabilityStatus: dto.availabilityStatus ?? null,
    experiences: (dto.experiences ?? []).map(mapExperience),
  };
}
