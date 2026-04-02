"use server";

import { profilesControllerFindAll } from "@/shared/open-api/profiles/profiles";
import { mapProfileDtoToCardData } from "../mappers/profile.mapper";
import { ProfileCardData } from "@/shared/types/card.types";

export interface GetProfilesResult {
  data: ProfileCardData[];
  total: number;
}

/**
 * React Server Action to fetch Specialists (Profiles) via Orval-generated API client.
 * 
 * Includes the Anti-Corruption Mapper translating backend DTO into 
 * standard frontend UI CardData structure safely.
 */
export async function getProfilesAction(page: number, limit: number): Promise<GetProfilesResult> {
  try {
    const response = await profilesControllerFindAll({ page, limit });

    const resObj = response as Record<string, unknown>;
    const payload = resObj?.data ?? response;

    // Extract raw items defensively taking into account { data: [], meta: {} }
    const rawItems: unknown[] = Array.isArray(payload) 
      ? (payload as unknown[])
      : (Array.isArray((payload as Record<string, unknown>)?.data) ? ((payload as Record<string, unknown>).data as unknown[]) : []);

    // Try extracting pagination metadata, falling back to array length
    const rawTotal = (payload as Record<string, unknown>)?.meta 
        ? ((payload as Record<string, unknown>).meta as Record<string, unknown>)?.totalItems as number
        : ((payload as Record<string, unknown>)?.total as number
            || parseInt((resObj?.headers as { get?: (s: string) => string | null } | undefined)?.get?.("x-total-count") || "0", 10) 
            || rawItems.length);

    // Execute the Mapper (Anti-Corruption Layer)
    const mappedData = rawItems.map((dto) => mapProfileDtoToCardData(dto as Parameters<typeof mapProfileDtoToCardData>[0]));

    return {
      data: mappedData,
      total: rawTotal,
    };
  } catch (error: unknown) {
    // If we catch a NextJS redirect, let it pass so routing works
    if (typeof error === "object" && error !== null && "digest" in error && typeof (error as Record<string, unknown>).digest === "string" && (error as Record<string, unknown>).digest?.toString().startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    
    console.error("[getProfilesAction] Error fetching profiles:", error);
    // Silent degradation returning empty array to UI instead of violent crash
    return { data: [], total: 0 };
  }
}
