import type { MeResponseDto } from "@/shared/open-api/models";
import type { MyProfileData } from "@/entities/profiles/types";

/**
 * Adapter: MeResponseDto → MyProfileData
 *
 * Used in root layout (myProfileControllerFindMe) to populate the session.
 * Adds computed displayName — UI never needs to guess the right fallback.
 */
export function mapMeResponseDto(dto: MeResponseDto): MyProfileData {
  return {
    id: dto.id,
    fullName: dto.fullName ?? null,
    username: dto.username ?? null,
    email: dto.email ?? null,
    avatarUrl: dto.avatarUrl ?? null,
    displayName:
      dto.fullName ?? dto.username ?? dto.email ?? dto.blockchainAccount ?? "Anonymous",
    lastActiveWorkspaceId: dto.lastActiveWorkspaceId ?? null,
    blockchainAccount: dto.blockchainAccount ?? null,
  };
}

/** Type-guard: checks if an unknown value conforms to MyProfileData */
export function isMyProfileData(value: unknown): value is MyProfileData {
  return (
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    typeof (value as Record<string, unknown>).id === "string"
  );
}
