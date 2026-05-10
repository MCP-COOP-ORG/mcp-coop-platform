"use server";

// Assuming we have myProfileControllerDeleteExperience in profiles API
import { myProfileControllerDeleteExperience } from "@/shared/open-api/profiles/profiles";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";

export interface DeleteExperienceResult {
  success: boolean;
  error?: string;
}

export async function deleteExperienceAction(id: string): Promise<DeleteExperienceResult> {
  try {
    await myProfileControllerDeleteExperience(id);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[deleteExperienceAction] Error:", error);
    return { success: false, error: "DELETE_EXPERIENCE_FAILED" };
  }
}
