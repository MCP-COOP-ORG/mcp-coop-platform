"use server";

import { coopsControllerFindOne } from "@/shared/open-api/coops/coops";
import { mapCoopFullDto } from "@/shared/mappers";
import type { CoopFullData } from "@/entities/coops/types";
import { uuidSchema } from "@/shared/validation/uuid";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";

export interface GetCoopByIdResult {
  data: CoopFullData | null;
  error?: string;
}

/**
 * Server Action: fetch a single Cooperative by UUID.
 *
 * Validates the ID format via Zod before hitting the network.
 * Maps CoopFullResponseDto → CoopFullData via dedicated mapper.
 */
export async function getCoopByIdAction(id: string): Promise<GetCoopByIdResult> {
  const parsed = uuidSchema.safeParse(id);

  if (!parsed.success) {
    return { data: null, error: "Invalid cooperative ID format" };
  }

  try {
    const response = await coopsControllerFindOne(parsed.data);

    if (!response.data || typeof response.data !== "object") {
      return { data: null, error: "Cooperative not found" };
    }

    return { data: mapCoopFullDto(response.data) };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;

    console.error("[getCoopByIdAction] Error:", error);
    return { data: null, error: "Failed to load cooperative data" };
  }
}

