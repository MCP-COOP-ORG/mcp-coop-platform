"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tabs, Tab, Button, Spinner } from "@/shared/ui/primitives";
import { useManageCoop } from "../hooks/use-manage-coop";
import { getCoopByIdAction } from "../api";
import { ManageGeneralTab, ManageContactsTab, ManageWalletsTab } from "./manage-coop-tabs";

interface ManageCoopModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coopId: string | null;
  onSaved: () => void;
}

export function ManageCoopModal({ isOpen, onOpenChange, coopId, onSaved }: ManageCoopModalProps) {
  const t = useTranslations("ManageCoop");
  const { form, handleSaveAll, isSaving, error } = useManageCoop(coopId, () => {
    onSaved();
    onOpenChange(false);
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const initModal = async () => {
      if (isOpen && coopId) {
        setIsLoading(true);
        const res = await getCoopByIdAction(coopId);
        if (!mounted) return;
        
        if (res.data) {
          const c = res.data;
          const contactsArray = c.contacts 
            ? Object.entries(c.contacts).flatMap(([platform, list]) => list.map((item: { value: string }) => ({ platform, value: item.value })))
            : [];
          const walletsArray = c.wallets 
            ? Object.entries(c.wallets).flatMap(([network, list]) => list.map((item: { address: string }) => ({ network, address: item.address, isPrimary: false })))
            : [];

          form.reset({
            general: {
              name: c.name,
              description: c.shortDescription || "",
              website: c.website || "",
              logoUrl: c.logoUrl || "",
            },
            categories: { categories: c.categories || [] },
            contacts: { contacts: contactsArray },
            wallets: { wallets: walletsArray },
          });
        }
        setIsLoading(false);
      } else if (isOpen && !coopId) {
        form.reset({
          general: { name: "", description: "", website: "", logoUrl: "" },
          categories: { categories: [] },
          contacts: { contacts: [] },
          wallets: { wallets: [] },
        });
        setIsLoading(false);
      }
    };

    initModal();
    return () => { mounted = false; };
  }, [isOpen, coopId, form]);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <FormProvider {...form}>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }} className="flex flex-col h-full">
              <ModalHeader className="flex flex-col gap-1">
                {coopId ? t("titleEdit") || "Edit Cooperative" : t("titleCreate") || "Create Cooperative"}
              </ModalHeader>
              <ModalBody className="pb-6 px-1 sm:px-6">
                {isLoading ? (
                  <div className="flex justify-center p-8"><Spinner /></div>
                ) : (
                  <Tabs aria-label="Manage Coop Tabs" className="w-full" variant="underlined">
                    <Tab key="general" title={t("tabGeneral") || "General"}>
                      <ManageGeneralTab />
                    </Tab>
                    <Tab key="contacts" title={t("tabContacts") || "Contacts"}>
                      <ManageContactsTab />
                    </Tab>
                    <Tab key="wallets" title={t("tabWallets") || "Wallets"}>
                      <ManageWalletsTab />
                    </Tab>
                  </Tabs>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-between items-center">
                <div className="text-danger text-sm font-medium">{error}</div>
                <div className="flex gap-2">
                  <Button appVariant="ghost" onPress={onClose}>{t("cancel") || "Cancel"}</Button>
                  <Button appVariant="primary-action" isLoading={isSaving} type="submit">
                    {isSaving ? t("saving") || "Saving..." : t("save") || "Save All"}
                  </Button>
                </div>
              </ModalFooter>
            </form>
          </FormProvider>
        )}
      </ModalContent>
    </Modal>
  );
}
