"use server";

import { profilesControllerFindOne } from "@/shared/open-api/profiles/profiles";
import { mapProfileFullDto } from "@/shared/mappers";
import type { ProfileFullData } from "@/entities/profiles/types";
import { uuidSchema } from "@/shared/validation/uuid";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";

export interface GetProfileByIdResult {
  data: ProfileFullData | null;
  error?: string;
}

/**
 * Server Action: fetch a single Profile by UUID.
 *
 * Validates the ID format via Zod before hitting the network.
 * Maps ProfileFullResponseDto → ProfileFullData via dedicated mapper.
 */
export async function getProfileByIdAction(id: string): Promise<GetProfileByIdResult> {
  const parsed = uuidSchema.safeParse(id);

  if (!parsed.success) {
    return { data: null, error: "Invalid profile ID format" };
  }

  try {
    const response = await profilesControllerFindOne(parsed.data);

    if (!response.data || typeof response.data !== "object") {
      return { data: null, error: "Profile not found" };
    }

    return { data: mapProfileFullDto(response.data) };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;

    console.error("[getProfileByIdAction] Error:", error);
    return { data: null, error: "Failed to load profile data" };
  }
}

