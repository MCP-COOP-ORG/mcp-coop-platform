import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createCoopAction, 
  updateCoopGeneralAction, 
  syncCoopCategoriesAction, 
  syncCoopContactsAction, 
  syncCoopWalletsAction 
} from "../api";
import { manageCoopFormSchema, type ManageCoopFormValues } from "../schemas/manage-coop.schema";

export function useManageCoop(initialCoopId: string | null, onSaved?: () => void) {
  const [coopId, setCoopId] = useState<string | null>(initialCoopId);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ManageCoopFormValues>({
    resolver: zodResolver(manageCoopFormSchema),
    defaultValues: {
      general: { name: "", description: "", website: "", logoUrl: "" },
      categories: { categories: [] },
      contacts: { contacts: [] },
      wallets: { wallets: [] },
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<ManageCoopFormValues> = async (data) => {
    setIsSaving(true);
    setError(null);
    try {
      let currentId = coopId;

      // 1. Create or Update General
      if (!currentId) {
        const createRes = await createCoopAction({
          ...data.general,
          categories: data.categories.categories,
        });
        
        if (!createRes.success || !createRes.data) {
          throw new Error(createRes.error || "CREATE_FAILED");
        }
        currentId = createRes.data;
        setCoopId(currentId);
      } else {
        const updateRes = await updateCoopGeneralAction(currentId, data.general);
        if (!updateRes.success) throw new Error(updateRes.error || "UPDATE_FAILED");
        
        const catRes = await syncCoopCategoriesAction(currentId, data.categories);
        if (!catRes.success) throw new Error(catRes.error || "SYNC_CATEGORIES_FAILED");
      }

      // 2. Sync Contacts & Wallets in PARALLEL
      const syncTasks = [];
      if (data.contacts.contacts.length > 0) {
        syncTasks.push(
          syncCoopContactsAction(currentId, data.contacts).then(res => {
            if (!res.success) throw new Error(res.error || "SYNC_CONTACTS_FAILED");
          })
        );
      }

      if (data.wallets.wallets.length > 0) {
        syncTasks.push(
          syncCoopWalletsAction(currentId, data.wallets).then(res => {
            if (!res.success) throw new Error(res.error || "SYNC_WALLETS_FAILED");
          })
        );
      }

      await Promise.all(syncTasks);

      onSaved?.();
    } catch (err: unknown) {
      setError((err as Error).message || "SAVE_FAILED");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    coopId,
    form,
    handleSaveAll: form.handleSubmit(onSubmit),
    isSaving,
    error,
  };
}
