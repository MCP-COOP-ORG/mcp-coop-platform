"use server";

import { myProfileControllerUpdateGeneral } from "@/shared/open-api/profiles/profiles";
import type { UpdateProfileGeneralDto } from "@/shared/open-api/models/updateProfileGeneralDto";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { editGeneralSchema } from "../schemas";

export interface UpdateGeneralResult {
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function updateGeneralAction(dto: UpdateProfileGeneralDto): Promise<UpdateGeneralResult> {
  const parsed = editGeneralSchema.safeParse(dto);
  if (!parsed.success) {
    return { success: false, error: "VALIDATION_ERROR", validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    await myProfileControllerUpdateGeneral(parsed.data);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[updateGeneralAction] Error:", error);
    return { success: false, error: "UPDATE_GENERAL_FAILED" };
  }
}
