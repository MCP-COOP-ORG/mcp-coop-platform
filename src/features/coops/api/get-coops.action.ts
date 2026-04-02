"use server";

import { coopsControllerFindAll } from "@/shared/open-api/coops/coops";
import { mapCoopDtoToCardData } from "../mappers/coop.mapper";
import { CoopCardData } from "@/shared/types/card.types";

export interface GetCoopsResult {
  data: CoopCardData[];
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
    
    const resObj = response as Record<string, unknown>;
    const payload = resObj?.data ?? response;
    
    // The backend payload might be { data: [], meta: {} } or directly an array []
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
    const mappedData = rawItems.map((dto) => mapCoopDtoToCardData(dto as Parameters<typeof mapCoopDtoToCardData>[0]));

    return {
      data: mappedData,
      total: rawTotal,
    };
  } catch (error: unknown) {
    // If we catch a NextJS redirect from interceptors, let it pass so routing works
    if (typeof error === "object" && error !== null && "digest" in error && typeof (error as Record<string, unknown>).digest === "string" && (error as Record<string, unknown>).digest?.toString().startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("[getCoopsAction] Error fetching coops:", error);
    // Silent degradation returning empty array to UI instead of failing violently
    return { data: [], total: 0 };
  }
}
