"use server";

import { myProfileControllerSyncSkills } from "@/shared/open-api/profiles/profiles";
import type { SyncSkillsDto } from "@/shared/open-api/models/syncSkillsDto";
import type { SkillDto } from "@/shared/open-api/models/skillDto";
import type { SelectedSkill } from "../types";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { syncSkillsSchema } from "../schemas";

export interface SyncSkillsResult {
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function syncSkillsAction(selectedSkills: SelectedSkill[]): Promise<SyncSkillsResult> {
  const mapped = selectedSkills.map(s => ({
    skillId: s.id,
    level: s.level || 3,
  }));

  const parsed = syncSkillsSchema.safeParse(mapped);
  if (!parsed.success) {
    return { success: false, error: "VALIDATION_ERROR", validationErrors: parsed.error.flatten().fieldErrors as unknown as Record<string, string[]> };
  }

  try {
    const skills: SkillDto[] = selectedSkills.map(s => ({
      name: s.name,
      level: s.level || 3,
    }));

    const dto: SyncSkillsDto = { skills };
    await myProfileControllerSyncSkills(dto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[syncSkillsAction] Error:", error);
    return { success: false, error: "SYNC_SKILLS_FAILED" };
  }
}
