"use server";

import { myProfileControllerFindMe, profilesControllerFindOne } from "@/shared/open-api/profiles/profiles";
import { mapProfileFullDto } from "@/shared/mappers";
import type { ProfileFullData } from "@/entities/profiles/types";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";

export interface GetMyFullProfileResult {
  data: ProfileFullData | null;
  error?: string;
}

export async function getMyFullProfileAction(): Promise<GetMyFullProfileResult> {
  try {
    const meResponse = await myProfileControllerFindMe();
    
    if (!meResponse.data || typeof meResponse.data !== "object" || !('id' in meResponse.data)) {
      return { data: null, error: "FETCH_PROFILE_UNAUTHORIZED" };
    }

    const myId = String(meResponse.data.id);
    const fullResponse = await profilesControllerFindOne(myId);

    if (!fullResponse.data || typeof fullResponse.data !== "object") {
      return { data: null, error: "FETCH_PROFILE_NOT_FOUND" };
    }

    return { data: mapProfileFullDto(fullResponse.data) };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[getMyFullProfileAction] Error:", error);
    return { data: null, error: "FETCH_PROFILE_FAILED" };
  }
}
