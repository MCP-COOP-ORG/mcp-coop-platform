"use server";

import { coopsControllerFindAll } from "@/shared/open-api/coops/coops";
import { mapCoopDtoToCardData } from "../mappers/coop.mapper";
import { CardData } from "@/shared/ui/components/card";

export interface GetCoopsResult {
  data: CardData[];
  total: number;
}

/**
 * React Server Action to fetch cooperative organizations via the Orval-generated API client.
 * 
 * Safely wraps the raw response and executes the Anti-Corruption Mapper 
 * to ensure the UI receives exactly the typing it demands (CardData).
 */
export async function getCoopsAction(page: number, limit: number): Promise<GetCoopsResult> {
  try {
    // Fetch via strict Orval Client
    // Any backend breaking schema changes are captured here or inside the mutator
    const response = await coopsControllerFindAll({ page, limit });
    
    const payload = (response as any)?.data;
    
    // The backend payload might be { data: [], meta: {} } or directly an array []
    const rawItems: any[] = Array.isArray(payload) 
      ? payload 
      : (Array.isArray(payload?.data) ? payload.data : []);

    // Try extracting pagination metadata, falling back to array length
    const rawTotal = payload?.meta?.totalItems 
      || payload?.total
      || parseInt((response as any)?.headers?.get("x-total-count") || "0", 10) 
      || rawItems.length;

    // Execute the Mapper (Anti-Corruption Layer)
    const mappedData = rawItems.map((dto) => mapCoopDtoToCardData(dto));

    return {
      data: mappedData,
      total: rawTotal,
    };
  } catch (error: any) {
    // If we catch a NextJS redirect from interceptors, let it pass so routing works
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("[getCoopsAction] Error fetching coops:", error);
    // Silent degradation returning empty array to UI instead of failing violently
    return { data: [], total: 0 };
  }
}
