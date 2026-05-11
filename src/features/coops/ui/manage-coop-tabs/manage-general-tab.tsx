import { useTranslations } from "next-intl";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Textarea, Select, SelectItem, Chip } from "@/shared/ui/primitives";
import { Globe, Image as ImageIcon } from "lucide-react";
import type { ManageCoopFormValues } from "../../schemas/manage-coop.schema";

const PREDEFINED_CATEGORIES = [
  { id: "defi", name: "DeFi" },
  { id: "nft", name: "NFT" },
  { id: "dao", name: "DAO Framework" },
  { id: "social", name: "SocialFi" },
  { id: "gaming", name: "GameFi" },
  { id: "infra", name: "Infrastructure" },
  { id: "education", name: "Education" },
  { id: "art", name: "Art & Culture" }
];

export function ManageGeneralTab() {
  const t = useTranslations("ManageCoop");
  const { register, formState: { errors }, control } = useFormContext<ManageCoopFormValues>();

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("nameLabel") || "Cooperative Name"}
          {...register("general.name")}
          errorMessage={errors.general?.name?.message}
          isInvalid={!!errors.general?.name}
          maxLength={100}
        />
        
        <Controller
          name="categories.categories"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label={t("categoriesLabel") || "Categories"}
              selectionMode="multiple"
              selectedKeys={new Set(value || [])}
              onSelectionChange={(keys) => {
                if (keys === "all") return;
                onChange(Array.from(keys) as string[]);
              }}
              placeholder="Select categories"
              disableAnimation
              renderValue={(items) => (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key} size="sm" variant="flat">
                      {item.textValue}
                    </Chip>
                  ))}
                </div>
              )}
            >
              {PREDEFINED_CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} textValue={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Textarea
        label={t("descLabel") || "Description"}
        {...register("general.description")}
        errorMessage={errors.general?.description?.message}
        isInvalid={!!errors.general?.description}
        maxLength={1000}
        minRows={4}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("websiteUrl") || "Website URL"}
          {...register("general.website")}
          errorMessage={errors.general?.website?.message}
          isInvalid={!!errors.general?.website}
          startContent={<Globe size={16} className="text-default-400" />}
          maxLength={255}
        />
        
        <Input
          label={t("logoUrl") || "Logo URL"}
          {...register("general.logoUrl")}
          errorMessage={errors.general?.logoUrl?.message}
          isInvalid={!!errors.general?.logoUrl}
          startContent={<ImageIcon size={16} className="text-default-400" />}
        />
      </div>
    </div>
  );
}
