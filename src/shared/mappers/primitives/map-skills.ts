import type { ProfileSkillDto } from "@/shared/open-api/models";
import type { SkillItem } from "@/shared/ui/components/skills";

export interface MappedSkills {
  skills: SkillItem[];
  /** Unique categories extracted from skills array */
  categories: string[];
}

/**
 * Adapter: maps ProfileSkillDto[] to a {skills, categories} shape.
 *
 * Categories are derived from skills — no duplication, preserves insertion order.
 * Used by both profile-card and profile-full mappers.
 */
export function mapSkills(raw: ProfileSkillDto[] | null | undefined): MappedSkills {
  if (!raw?.length) return { skills: [], categories: [] };

  const skills: SkillItem[] = raw.map((dto) => ({
    id: dto.id,
    name: dto.name,
    category: dto.category,
    iconUrl: dto.iconUrl ?? null,
  }));

  const categories = Array.from(
    new Set(skills.map((s) => s.category).filter((c): c is string => !!c)),
  );

  return { skills, categories };
}
