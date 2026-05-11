"use server";

import { revalidatePath } from "next/cache";

import { 
  coopsControllerCreate, 
  coopsControllerUpdateGeneral, 
  coopsControllerSyncCategories, 
  coopsControllerSyncContacts, 
  coopsControllerSyncWallets,
  coopsControllerDeleteCoop
} from "@/shared/open-api/coops/coops";
import type { CreateCoopDto } from "@/shared/open-api/models/createCoopDto";
import type { UpdateCoopGeneralDto } from "@/shared/open-api/models/updateCoopGeneralDto";
import type { SyncCategoriesDto } from "@/shared/open-api/models/syncCategoriesDto";
import type { SyncCoopContactsDto } from "@/shared/open-api/models/syncCoopContactsDto";
import type { SyncCoopWalletsDto } from "@/shared/open-api/models/syncCoopWalletsDto";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { 
  createCoopSchema, 
  coopGeneralSchema, 
  coopCategoriesSchema, 
  coopContactsSchema, 
  coopWalletsSchema 
} from "../schemas/manage-coop.schema";

export interface ManageCoopResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function createCoopAction(dto: CreateCoopDto): Promise<ManageCoopResult<string>> {
  try {
    const parsed = createCoopSchema.safeParse(dto);
    if (!parsed.success) {
      return { success: false, error: "VALIDATION_FAILED", validationErrors: parsed.error.flatten().fieldErrors };
    }
    
    const response = await coopsControllerCreate(parsed.data as CreateCoopDto);
    // Cast appropriately based on typical Orval response wrapper for create endpoints
    const resShape = response as { data?: { id?: string }; id?: string };
    const id = resShape.data?.id || resShape.id || (response as unknown as string);
    return { success: true, data: id };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[createCoopAction] Error:", error);
    return { success: false, error: "CREATE_COOP_FAILED" };
  }
}

export async function updateCoopGeneralAction(id: string, dto: UpdateCoopGeneralDto): Promise<ManageCoopResult> {
  try {
    const parsed = coopGeneralSchema.safeParse(dto);
    if (!parsed.success) {
      return { success: false, error: "VALIDATION_FAILED", validationErrors: parsed.error.flatten().fieldErrors };
    }
    
    await coopsControllerUpdateGeneral(id, parsed.data as UpdateCoopGeneralDto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[updateCoopGeneralAction] Error:", error);
    return { success: false, error: "UPDATE_GENERAL_FAILED" };
  }
}

export async function syncCoopCategoriesAction(id: string, dto: SyncCategoriesDto): Promise<ManageCoopResult> {
  try {
    const parsed = coopCategoriesSchema.safeParse(dto);
    if (!parsed.success) {
      return { success: false, error: "VALIDATION_FAILED", validationErrors: parsed.error.flatten().fieldErrors };
    }
    
    await coopsControllerSyncCategories(id, parsed.data as SyncCategoriesDto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[syncCoopCategoriesAction] Error:", error);
    return { success: false, error: "SYNC_CATEGORIES_FAILED" };
  }
}

export async function syncCoopContactsAction(id: string, dto: SyncCoopContactsDto): Promise<ManageCoopResult> {
  try {
    const parsed = coopContactsSchema.safeParse(dto);
    if (!parsed.success) {
      return { success: false, error: "VALIDATION_FAILED", validationErrors: parsed.error.flatten().fieldErrors };
    }
    
    await coopsControllerSyncContacts(id, parsed.data as SyncCoopContactsDto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[syncCoopContactsAction] Error:", error);
    return { success: false, error: "SYNC_CONTACTS_FAILED" };
  }
}

export async function syncCoopWalletsAction(id: string, dto: SyncCoopWalletsDto): Promise<ManageCoopResult> {
  try {
    const parsed = coopWalletsSchema.safeParse(dto);
    if (!parsed.success) {
      return { success: false, error: "VALIDATION_FAILED", validationErrors: parsed.error.flatten().fieldErrors };
    }
    
    await coopsControllerSyncWallets(id, parsed.data as SyncCoopWalletsDto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[syncCoopWalletsAction] Error:", error);
    return { success: false, error: "SYNC_WALLETS_FAILED" };
  }
}

export async function deleteCoopAction(coopId: string): Promise<ManageCoopResult> {
  try {
    await coopsControllerDeleteCoop(coopId);
    revalidatePath("/(app)/[locale]/edit-profile");
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[deleteCoopAction] Error:", error);
    return { success: false, error: "DELETE_COOP_FAILED" };
  }
}
