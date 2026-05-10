"use server";

import { myProfileControllerSyncWallets } from "@/shared/open-api/profiles/profiles";
import type { SyncWalletsDto } from "@/shared/open-api/models/syncWalletsDto";
import type { WalletDto } from "@/shared/open-api/models/walletDto";
import type { EditWalletsFormData } from "../types";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { SUPPORTED_NETWORKS } from "@/shared/constants/crypto";
import { editWalletsSchema } from "../schemas";

export interface SyncWalletsResult {
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function syncWalletsAction(mappedWallets: EditWalletsFormData): Promise<SyncWalletsResult> {
  const parsed = editWalletsSchema.safeParse(mappedWallets);
  if (!parsed.success) {
    return { success: false, error: "VALIDATION_ERROR", validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    const wallets: WalletDto[] = [];

    for (const network of SUPPORTED_NETWORKS) {
      const entry = parsed.data[network];
      if (entry && entry.address) {
        wallets.push({
          network,
          address: entry.address,
          isPrimary: entry.isPrimary || false,
        });
      }
    }

    const dto: SyncWalletsDto = { wallets };
    await myProfileControllerSyncWallets(dto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[syncWalletsAction] Error:", error);
    return { success: false, error: "SYNC_WALLETS_FAILED" };
  }
}
