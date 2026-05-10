"use server";

import { myProfileControllerCreateExperience } from "@/shared/open-api/profiles/profiles";
import type { UpsertExperienceDto } from "@/shared/open-api/models/upsertExperienceDto";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { editExperienceSchema } from "../schemas";

export interface CreateExperienceResult {
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function createExperienceAction(dto: UpsertExperienceDto): Promise<CreateExperienceResult> {
  const parsed = editExperienceSchema.safeParse(dto);
  if (!parsed.success) {
    return { success: false, error: "VALIDATION_ERROR", validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    await myProfileControllerCreateExperience(parsed.data as UpsertExperienceDto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[createExperienceAction] Error:", error);
    return { success: false, error: "CREATE_EXPERIENCE_FAILED" };
  }
}
