"use server";

import { profilesControllerFindAll } from "@/shared/open-api/profiles/profiles";
import { mapProfileDtoToCardData } from "../mappers/profile.mapper";
import { CardData } from "@/shared/ui/components/card";

export interface GetProfilesResult {
  data: CardData[];
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

    const payload = (response as any)?.data;

    // Extract raw items defensively taking into account { data: [], meta: {} }
    const rawItems: any[] = Array.isArray(payload) 
      ? payload 
      : (Array.isArray(payload?.data) ? payload.data : []);

    // Try extracting pagination metadata, falling back to array length
    const rawTotal = payload?.meta?.totalItems 
      || payload?.total 
      || parseInt((response as any)?.headers?.get("x-total-count") || "0", 10) 
      || rawItems.length;

    // Execute the Mapper (Anti-Corruption Layer)
    const mappedData = rawItems.map((dto) => mapProfileDtoToCardData(dto));

    return {
      data: mappedData,
      total: rawTotal,
    };
  } catch (error: any) {
    // If we catch a NextJS redirect, let it pass so routing works
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    
    console.error("[getProfilesAction] Error fetching profiles:", error);
    // Silent degradation returning empty array to UI instead of violent crash
    return { data: [], total: 0 };
  }
}
