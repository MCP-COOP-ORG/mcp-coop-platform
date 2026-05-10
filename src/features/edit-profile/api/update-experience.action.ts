"use server";

import { myProfileControllerUpdateExperience } from "@/shared/open-api/profiles/profiles";
import type { UpsertExperienceDto } from "@/shared/open-api/models/upsertExperienceDto";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { editExperienceSchema } from "../schemas";

export interface UpdateExperienceResult {
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function updateExperienceAction(id: string, dto: UpsertExperienceDto): Promise<UpdateExperienceResult> {
  const parsed = editExperienceSchema.safeParse(dto);
  if (!parsed.success) {
    return { success: false, error: "VALIDATION_ERROR", validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    await myProfileControllerUpdateExperience(id, parsed.data as UpsertExperienceDto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[updateExperienceAction] Error:", error);
    return { success: false, error: "UPDATE_EXPERIENCE_FAILED" };
  }
}
