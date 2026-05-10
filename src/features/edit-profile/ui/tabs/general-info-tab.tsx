"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Textarea, Button, Chip } from "@/shared/ui/primitives";
import type { EditGeneralFormData } from "../../types";
import { updateGeneralAction } from "../../api";
import { MapPin, Globe, Clock } from "lucide-react";

export interface GeneralInfoTabProps {
  initialData: EditGeneralFormData;
  onSaved: () => void;
}

export function GeneralInfoTab({ initialData, onSaved }: GeneralInfoTabProps) {
  const t = useTranslations("EditProfile");
  const [formData, setFormData] = useState<EditGeneralFormData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [languageInput, setLanguageInput] = useState("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (field: keyof EditGeneralFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && languageInput.trim()) {
      e.preventDefault();
      if (!formData.languages.includes(languageInput.trim())) {
        setFormData(prev => ({
          ...prev,
          languages: [...prev.languages, languageInput.trim()]
        }));
      }
      setLanguageInput("");
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== langToRemove)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setGlobalError(null);
    setFieldErrors({});
    const result = await updateGeneralAction(formData);
    setIsSaving(false);
    if (result.success) {
      onSaved();
    } else {
      setGlobalError(result.error || "SERVER_ERROR");
      if (result.validationErrors) {
        setFieldErrors(result.validationErrors);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t("fullName")}
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          maxLength={100}
          isInvalid={!!fieldErrors.fullName}
          errorMessage={fieldErrors.fullName?.[0]}
        />
        <Input
          label={t("username")}
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          maxLength={100}
          isInvalid={!!fieldErrors.username}
          errorMessage={fieldErrors.username?.[0]}
        />
        <Input
          label={t("headline")}
          value={formData.headline}
          onChange={(e) => handleChange("headline", e.target.value)}
          maxLength={100}
          className="md:col-span-2"
          isInvalid={!!fieldErrors.headline}
          errorMessage={fieldErrors.headline?.[0]}
        />
        
        <Input
          label={t("location")}
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          startContent={<MapPin size={16} className="text-default-400" />}
          maxLength={100}
        />
        <Input
          label={t("timezone")}
          value={formData.timezone}
          onChange={(e) => handleChange("timezone", e.target.value)}
          startContent={<Globe size={16} className="text-default-400" />}
          maxLength={100}
        />
        <Input
          label={t("availabilityStatus")}
          value={formData.availabilityStatus}
          onChange={(e) => handleChange("availabilityStatus", e.target.value)}
          startContent={<Clock size={16} className="text-default-400" />}
          maxLength={100}
          className="md:col-span-2"
        />
      </div>

      <Textarea
        label={t("shortDescription")}
        value={formData.shortDescription}
        onChange={(e) => handleChange("shortDescription", e.target.value)}
        maxLength={2000}
        minRows={3}
      />

      <div className="flex flex-col gap-2">
        <Input
          label={t("languages")}
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          onKeyDown={handleAddLanguage}
          placeholder={t("languages")}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.languages.map((lang) => (
            <Chip key={lang} onClose={() => handleRemoveLanguage(lang)}>
              {lang}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 items-end">
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
