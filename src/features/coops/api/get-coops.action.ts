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
    
    // Safety check: The backend DTO could currently just be { [key: string]: unknown }
    // We try to extract data from `.data`, `.items`, or the array itself safely.
    const rawItems: any[] = Array.isArray((response as any)?.data) 
      ? (response as any).data 
      : (Array.isArray((response as any)?.items) ? (response as any).items : []);

    // Safety check: Try to extract a total count for pagination from body or headers
    const rawTotal = (response as any)?.total 
      || (response as any)?.meta?.totalItems
      || parseInt((response as any)?.headers?.get("x-total-count") || "0", 10) 
      || rawItems.length; // Fallback to array length if everything else fails

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
