"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Input, Button, Avatar, Checkbox, CheckboxGroup, Spinner } from "@/shared/ui/primitives";
import { useSkillsCatalog } from "../../hooks";
import { syncSkillsAction } from "../../api";
import type { SelectedSkill, SkillCatalogItem } from "../../types";
import { Search } from "lucide-react";

export interface SkillsTabProps {
  initialSkills: SelectedSkill[];
  onSaved: () => void;
}

export function SkillsTab({ initialSkills, onSaved }: SkillsTabProps) {
  const t = useTranslations("EditProfile");
  const { catalog, isLoading, error } = useSkillsCatalog();
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSkills.map(s => s.id));
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const filteredCatalog = useMemo(() => {
    if (!searchQuery) return catalog;
    const lowerQuery = searchQuery.toLowerCase();
    return catalog.filter(skill => skill.name.toLowerCase().includes(lowerQuery));
  }, [catalog, searchQuery]);

  const groupedCatalog = useMemo(() => {
    const groups: Record<string, SkillCatalogItem[]> = {};
    for (const skill of filteredCatalog) {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    }
    return groups;
  }, [filteredCatalog]);

  const handleSelectionChange = (value: string[]) => {
    setSelectedIds(value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Reconstruct SelectedSkill[] from IDs
    const selectedSkillsToSave: SelectedSkill[] = selectedIds.map(id => {
      // First check if it was already selected with a specific level
      const existing = initialSkills.find(s => s.id === id);
      if (existing) return existing;
      
      // If it's a new selection, find from catalog and default level
      const catItem = catalog.find(c => c.id === id);
      return {
        id,
        name: catItem?.name || id,
        category: catItem?.category || "Other",
        level: 3,
        iconUrl: catItem?.iconUrl || null,
      };
    });

    const result = await syncSkillsAction(selectedSkillsToSave);
    setIsSaving(false);
    if (result.success) {
      onSaved();
    } else {
      setGlobalError(result.error || "SERVER_ERROR");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-danger text-center p-8">{t(`errors.${error}`)}</div>;
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder={t("searchSkills")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search size={16} className="text-default-400" />}
          className="max-w-md"
        />
        <div className="text-sm text-default-500 font-medium">
          {selectedIds.length} {t("selectedSkills")}
        </div>
      </div>

      <div className="flex flex-col gap-8 max-h-[500px] overflow-y-auto pr-2 pb-4">
        {Object.keys(groupedCatalog).length === 0 ? (
          <div className="text-center text-default-500 py-8">{t("noSkills")}</div>
        ) : (
          Object.entries(groupedCatalog).map(([category, skills]) => (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold border-b border-divider pb-2">{category}</h3>
              <CheckboxGroup
                value={selectedIds}
                onChange={(val) => handleSelectionChange(val as string[])}
                className="gap-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <Checkbox key={skill.id} value={skill.id} classNames={{
                      base: "inline-flex w-full max-w-full bg-content2 m-0 hover:bg-content3 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary",
                      label: "w-full"
                    }}>
                      <div className="flex items-center gap-3">
                        <Avatar 
                          src={skill.iconUrl || undefined} 
                          name={skill.name} 
                          radius="none" 
                          className="w-6 h-6 bg-transparent [&_img]:object-contain" 
                        />
                        <span className="text-small font-medium">{skill.name}</span>
                      </div>
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-divider items-end">
        {globalError && (
          <div className="text-danger text-sm font-medium">
            {t(`errors.${globalError}`)}
          </div>
        )}
        <Button appVariant="primary-action" onPress={handleSave} isLoading={isSaving}>
          {isSaving ? t("saving") : t("save")}
        </Button>
      </div>
    </div>
  );
}
