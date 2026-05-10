"use server";

import { skillsControllerFindAll } from "@/shared/open-api/skills/skills";
import type { SkillCatalogItem } from "../types";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";

export interface GetSkillsCatalogResult {
  data: SkillCatalogItem[];
  error?: string;
}

export async function getSkillsCatalogAction(): Promise<GetSkillsCatalogResult> {
  try {
    const response = await skillsControllerFindAll({ limit: 1000 }); // fetch all

    if (!response.data || !Array.isArray(response.data.data)) {
      return { data: [], error: "FETCH_SKILLS_INVALID_RESPONSE" };
    }

    const items: SkillCatalogItem[] = [];

    for (const rawSkill of response.data.data) {
      if (rawSkill && typeof rawSkill === "object") {
        const id = "id" in rawSkill ? String(rawSkill.id) : "";
        const name = "name" in rawSkill ? String(rawSkill.name) : "";
        const category = "category" in rawSkill ? String(rawSkill.category) : "Other";
        const iconUrl = "iconUrl" in rawSkill && rawSkill.iconUrl ? String(rawSkill.iconUrl) : null;

        if (id && name) {
          items.push({ id, name, category, iconUrl });
        }
      }
    }

    return { data: items };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[getSkillsCatalogAction] Error:", error);
    return { data: [], error: "FETCH_SKILLS_FAILED" };
  }
}
