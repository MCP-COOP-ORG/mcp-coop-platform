import { useTranslations } from "next-intl";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input, Button } from "@/shared/ui/primitives";
import { Plus, Trash2 } from "lucide-react";
import type { ManageCoopFormValues } from "../../schemas/manage-coop.schema";

export function ManageContactsTab() {
  const t = useTranslations("ManageCoop");
  const { control, register, formState: { errors } } = useFormContext<ManageCoopFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts.contacts"
  });

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-default-500">
          {t("contactsDesc") || "Add public contact methods for your cooperative."}
        </p>
        <Button 
          appVariant="ghost" 
          size="sm" 
          startContent={<Plus size={16} />}
          onPress={() => append({ platform: "", value: "" })}
        >
          {t("addContact") || "Add Contact"}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start">
            <Input
              className="flex-1"
              label={t("platform") || "Platform (e.g. Telegram)"}
              {...register(`contacts.contacts.${index}.platform` as const)}
              errorMessage={errors.contacts?.contacts?.[index]?.platform?.message}
              isInvalid={!!errors.contacts?.contacts?.[index]?.platform}
            />
            <Input
              className="flex-2"
              label={t("contactValue") || "Link or Username"}
              {...register(`contacts.contacts.${index}.value` as const)}
              errorMessage={errors.contacts?.contacts?.[index]?.value?.message}
              isInvalid={!!errors.contacts?.contacts?.[index]?.value}
            />
            <Button
              isIconOnly
              appVariant="icon-only"
              className="mt-2 text-danger"
              onPress={() => remove(index)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-default-400 border border-dashed rounded-xl border-default-200">
            {t("noContacts") || "No contacts added yet"}
          </div>
        )}
      </div>
    </div>
  );
}
