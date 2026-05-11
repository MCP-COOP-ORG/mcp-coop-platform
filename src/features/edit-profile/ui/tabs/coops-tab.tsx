"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button, Spinner, Modal } from "@/shared/ui/primitives";
import { getCoopsAction } from "@/features/coops/api/get-coops.action";
import { deleteCoopAction } from "@/features/coops/api/manage-coop.actions";
import { Plus, Trash2 } from "lucide-react";
import { ManageCoopModal } from "@/features/coops/ui/manage-coop-modal";
import type { CoopCardData } from "@/entities/coops/types";

interface CoopsTabProps {
  proposerAddress?: string | null;
}

export function CoopsTab({ proposerAddress }: CoopsTabProps) {
  const t = useTranslations("EditProfile");
  const [coops, setCoops] = useState<CoopCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedCoopId, setSelectedCoopId] = useState<string | null>(null);

  const [coopToDelete, setCoopToDelete] = useState<string | null>(null);

  const loadCoops = useCallback(async () => {
    if (!proposerAddress) {
      setCoops([]);
      return;
    }
    const res = await getCoopsAction(1, 100, { proposerAddress });
    if (res.data) {
      setCoops(res.data);
    }
  }, [proposerAddress]);

  useEffect(() => {
    let ignore = false;
    const fetchCoops = async () => {
      setIsLoading(true);
      if (!proposerAddress) {
        if (!ignore) setIsLoading(false);
        return;
      }
      const res = await getCoopsAction(1, 100, { proposerAddress });
      if (!ignore) {
        if (res.data) setCoops(res.data);
        setIsLoading(false);
      }
    };
    fetchCoops();
    return () => { ignore = true; };
  }, [proposerAddress]);

  const handleOpenManage = (coopId?: string) => {
    setSelectedCoopId(coopId || null);
    setIsManageModalOpen(true);
  };

  const handleSaved = () => {
    loadCoops();
  };

  const handleDeleteCoop = async () => {
    if (!coopToDelete) return;
    setIsLoading(true);
    setCoopToDelete(null);
    const res = await deleteCoopAction(coopToDelete);
    if (res.success) {
      await loadCoops();
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert(t("errors.DELETE_COOP_FAILED") || "Failed to delete cooperative.");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t("coopsTitle") || "My Cooperatives"}</h3>
        <Button 
          appVariant="primary-action" 
          onPress={() => handleOpenManage()}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("coopsAddBtn") || "Add Cooperative"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4"><Spinner /></div>
      ) : coops.length === 0 ? (
        <div className="text-center text-default-500 py-8 bg-default-50 rounded-xl border border-dashed border-default-200">
          {t("coopsEmptyState") || "You haven't created any cooperatives yet."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {coops.map(coop => (
            <div key={coop.id} className="flex justify-between items-center p-4 border border-default-200 rounded-xl hover:bg-default-50 transition-colors">
              <div>
                <p className="font-medium">{coop.name}</p>
                {coop.description && <p className="text-small text-default-500 line-clamp-1">{coop.description}</p>}
              </div>
              <div className="flex gap-2">
                <Button appVariant="ghost" onPress={() => handleOpenManage(coop.id)}>
                  {t("coopsEditBtn") || "Edit"}
                </Button>
                <Button 
                  appVariant="ghost" 
                  className="text-danger" 
                  onPress={() => setCoopToDelete(coop.id)}
                  isIconOnly
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isManageModalOpen && (
        <ManageCoopModal 
          isOpen={isManageModalOpen}
          onOpenChange={setIsManageModalOpen}
          coopId={selectedCoopId}
          onSaved={handleSaved}
        />
      )}

      <Modal
        isOpen={!!coopToDelete}
        onOpenChange={(open) => !open && setCoopToDelete(null)}
        title={t("coopsConfirmDeleteTitle") || "Delete Cooperative"}
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button appVariant="ghost" onPress={() => setCoopToDelete(null)}>
              {t("cancel") || "Cancel"}
            </Button>
            <Button appVariant="danger-action" onPress={handleDeleteCoop}>
              {t("delete") || "Delete"}
            </Button>
          </div>
        }
      >
        <p className="text-default-500 text-center">
          {t("coopsConfirmDelete") || "Are you sure you want to delete this cooperative? This action cannot be undone."}
        </p>
      </Modal>
    </div>
  );
}
