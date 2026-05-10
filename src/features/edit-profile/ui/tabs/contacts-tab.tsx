"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Button } from "@/shared/ui/primitives";
import type { EditContactsFormData } from "../../types";
import { syncContactsAction } from "../../api";
import { CONTACT_ICONS_MAP } from "@/shared/ui/components/contacts";
import type { MappedContacts } from "@/shared/mappers/primitives/types";

export interface ContactsTabProps {
  initialData: EditContactsFormData;
  onSaved: () => void;
}

export function ContactsTab({ initialData, onSaved }: ContactsTabProps) {
  const t = useTranslations("EditProfile");
  const [formData, setFormData] = useState<EditContactsFormData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const contactKeys = Object.keys(CONTACT_ICONS_MAP) as Array<keyof MappedContacts>;

  const handleChange = (key: keyof MappedContacts, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setGlobalError(null);
    setFieldErrors({});
    const result = await syncContactsAction(formData);
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
        {contactKeys.map((key) => {
          const Icon = CONTACT_ICONS_MAP[key];
          return (
            <Input
              key={key}
              label={t(key)}
              value={formData[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              startContent={<Icon className="w-4 h-4 text-default-400" />}
              isInvalid={!!fieldErrors[key]}
              errorMessage={fieldErrors[key]?.[0]}
            />
          );
        })}
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
