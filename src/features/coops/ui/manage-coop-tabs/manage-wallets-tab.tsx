import { useTranslations } from "next-intl";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input, Button } from "@/shared/ui/primitives";
import { Plus, Trash2 } from "lucide-react";
import type { ManageCoopFormValues } from "../../schemas/manage-coop.schema";

export function ManageWalletsTab() {
  const t = useTranslations("ManageCoop");
  const { control, register, formState: { errors } } = useFormContext<ManageCoopFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "wallets.wallets"
  });

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-default-500">
          {t("walletsDesc") || "Add public wallet addresses for donations or payments."}
        </p>
        <Button 
          appVariant="ghost" 
          size="sm" 
          startContent={<Plus size={16} />}
          onPress={() => append({ network: "", address: "", isPrimary: false })}
        >
          {t("addWallet") || "Add Wallet"}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start">
            <Input
              className="flex-1"
              label={t("network") || "Network (e.g. TON)"}
              {...register(`wallets.wallets.${index}.network` as const)}
              errorMessage={errors.wallets?.wallets?.[index]?.network?.message}
              isInvalid={!!errors.wallets?.wallets?.[index]?.network}
            />
            <Input
              className="flex-2"
              label={t("address") || "Wallet Address"}
              {...register(`wallets.wallets.${index}.address` as const)}
              errorMessage={errors.wallets?.wallets?.[index]?.address?.message}
              isInvalid={!!errors.wallets?.wallets?.[index]?.address}
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
            {t("noWallets") || "No wallets added yet"}
          </div>
        )}
      </div>
    </div>
  );
}
