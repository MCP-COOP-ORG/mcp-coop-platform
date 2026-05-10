"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Button, Card, CardBody, Checkbox, Textarea } from "@/shared/ui/primitives";
import type { EditExperienceFormData } from "../../types";
import { createExperienceAction, updateExperienceAction, deleteExperienceAction } from "../../api";
import { Edit2, Trash2, Plus, Calendar, Building, Briefcase } from "lucide-react";

export interface ExperienceTabProps {
  initialExperiences: EditExperienceFormData[];
  onSaved: () => void;
}

export function ExperienceTab({ initialExperiences, onSaved }: ExperienceTabProps) {
  const t = useTranslations("EditProfile");
  const [experiences] = useState<EditExperienceFormData[]>(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<EditExperienceFormData>({
    companyName: "",
    projectRole: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: []
  });
  const [isPresent, setIsPresent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const startEdit = (exp: EditExperienceFormData) => {
    setEditingId(exp.id || "new");
    setFormData(exp);
    setIsPresent(!exp.endDate);
    setGlobalError(null);
    setFieldErrors({});
  };

  const startNew = () => {
    setEditingId("new");
    setFormData({
      companyName: "",
      projectRole: "",
      startDate: "",
      endDate: "",
      description: "",
      skills: []
    });
    setIsPresent(false);
    setGlobalError(null);
    setFieldErrors({});
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setGlobalError(null);
    setFieldErrors({});
    const dto = {
      ...formData,
      endDate: isPresent ? undefined : (formData.endDate || undefined),
    };

    let result;
    if (editingId === "new") {
      result = await createExperienceAction(dto);
    } else if (editingId) {
      result = await updateExperienceAction(editingId, dto);
    }

    setIsSaving(false);
    if (result && result.success) {
      setEditingId(null);
      onSaved();
    } else if (result) {
      setGlobalError(result.error || "SERVER_ERROR");
      if (result.validationErrors) {
        setFieldErrors(result.validationErrors);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t("confirmDelete"))) {
      setIsDeletingId(id);
      const result = await deleteExperienceAction(id);
      setIsDeletingId(null);
      if (result.success) {
        onSaved();
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      {editingId ? (
        <Card className="border border-divider">
          <CardBody className="gap-4 p-6">
            <h3 className="text-lg font-semibold">
              {editingId === "new" ? t("addExperience") : t("editExperience")}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t("companyName")}
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                startContent={<Building size={16} className="text-default-400" />}
                maxLength={100}
                isRequired
                isInvalid={!!fieldErrors.companyName}
                errorMessage={fieldErrors.companyName?.[0]}
              />
              <Input
                label={t("projectRole")}
                value={formData.projectRole}
                onChange={(e) => setFormData(prev => ({ ...prev, projectRole: e.target.value }))}
                startContent={<Briefcase size={16} className="text-default-400" />}
                maxLength={100}
                isRequired
                isInvalid={!!fieldErrors.projectRole}
                errorMessage={fieldErrors.projectRole?.[0]}
              />
              <Input
                type="date"
                label={t("startDate")}
                value={formData.startDate ? formData.startDate.split('T')[0] : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: new Date(e.target.value).toISOString() }))}
                startContent={<Calendar size={16} className="text-default-400" />}
                isRequired
                isInvalid={!!fieldErrors.startDate}
                errorMessage={fieldErrors.startDate?.[0]}
              />
              <div className="flex flex-col gap-2">
                <Input
                  type="date"
                  label={t("endDate")}
                  value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: new Date(e.target.value).toISOString() }))}
                  startContent={<Calendar size={16} className="text-default-400" />}
                  isDisabled={isPresent}
                />
                <Checkbox isSelected={isPresent} onValueChange={setIsPresent}>
                  {t("present")}
                </Checkbox>
              </div>
            </div>

            <Textarea
              label={t("description")}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              maxLength={2000}
              minRows={4}
            />

            <div className="flex flex-col gap-2 mt-2 items-end">
              {globalError && (
                <div className="text-danger text-sm font-medium">
                  {t(`errors.${globalError}`)}
                </div>
              )}
              <div className="flex gap-2">
                <Button appVariant="ghost" onPress={cancelEdit} isDisabled={isSaving}>
                  {t("cancel")}
                </Button>
                <Button appVariant="primary-action" onPress={handleSave} isLoading={isSaving}>
                  {isSaving ? t("saving") : t("save")}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button appVariant="primary-action" startContent={<Plus size={16} />} onPress={startNew}>
              {t("addExperience")}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <Card key={exp.id} className="w-full">
                <CardBody className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold">{exp.companyName}</h4>
                    <p className="text-sm font-medium text-default-600">{exp.projectRole}</p>
                    <p className="text-xs text-default-400 mt-1">
                      {new Date(exp.startDate).toLocaleDateString()} — {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : t("present")}
                    </p>
                    {exp.description && (
                      <p className="text-sm mt-3 text-default-700 whitespace-pre-wrap line-clamp-3">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 items-start shrink-0">
                    <Button 
                      isIconOnly 
                      appVariant="ghost" 
                      onPress={() => startEdit(exp)}
                      aria-label={t("editExperience")}
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button 
                      isIconOnly 
                      appVariant="danger-action" 
                      isLoading={isDeletingId === exp.id}
                      onPress={() => exp.id && handleDelete(exp.id)}
                      aria-label={t("deleteExperience")}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
