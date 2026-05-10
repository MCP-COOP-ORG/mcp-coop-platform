"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Button, Checkbox, Card, CardBody } from "@/shared/ui/primitives";
import type { EditWalletsFormData } from "../../types";
import { syncWalletsAction } from "../../api";
import { SUPPORTED_NETWORKS, type NetworkKey } from "@/shared/constants/crypto";
import { NETWORK_ICONS_MAP } from "@/shared/ui/components/crypto-wallets";

export interface WalletsTabProps {
  initialData: EditWalletsFormData;
  onSaved: () => void;
}

export function WalletsTab({ initialData, onSaved }: WalletsTabProps) {
  const t = useTranslations("EditProfile");
  const [formData, setFormData] = useState<EditWalletsFormData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleAddressChange = (network: NetworkKey, address: string) => {
    setFormData(prev => ({
      ...prev,
      [network]: { ...prev[network], address, isPrimary: prev[network]?.isPrimary || false }
    }));
  };

  const handlePrimaryChange = (network: NetworkKey, isPrimary: boolean) => {
    setFormData(prev => ({
      ...prev,
      [network]: { ...prev[network], address: prev[network]?.address || "", isPrimary }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setGlobalError(null);
    setFieldErrors({});
    const result = await syncWalletsAction(formData);
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
        {SUPPORTED_NETWORKS.map((network) => {
          const Icon = NETWORK_ICONS_MAP[network];
          const entry = formData[network];
          
          return (
            <Card key={network} className="border border-divider shadow-sm">
              <CardBody className="p-4 gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-6 h-6" />
                  <h4 className="font-semibold capitalize">{network}</h4>
                </div>
                
                <Input
                  label={t("walletAddress")}
                  placeholder={t("walletAddress")}
                  value={entry?.address || ""}
                  onChange={(e) => handleAddressChange(network, e.target.value)}
                  isInvalid={!!fieldErrors[network]}
                  errorMessage={fieldErrors[network]?.[0]}
                />
                
                <Checkbox
                  isSelected={entry?.isPrimary || false}
                  onValueChange={(val) => handlePrimaryChange(network, val)}
                >
                  {t("isPrimary")}
                </Checkbox>
              </CardBody>
            </Card>
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
