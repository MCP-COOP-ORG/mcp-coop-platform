"use server";

import { myProfileControllerSyncContacts } from "@/shared/open-api/profiles/profiles";
import type { SyncContactsDto } from "@/shared/open-api/models/syncContactsDto";
import type { ContactDto } from "@/shared/open-api/models/contactDto";
import { CONTACT_KEYS } from "@/shared/constants/contacts";
import type { EditContactsFormData } from "../types";
import { isNextRedirect } from "@/shared/helpers/is-next-redirect";
import { editContactsSchema } from "../schemas";

export interface SyncContactsResult {
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function syncContactsAction(mappedContacts: EditContactsFormData): Promise<SyncContactsResult> {
  const parsed = editContactsSchema.safeParse(mappedContacts);
  if (!parsed.success) {
    return { success: false, error: "VALIDATION_ERROR", validationErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    const contacts: ContactDto[] = [];

    // Reverse mapping from MappedContacts to ContactDto[]
    for (const [key, value] of Object.entries(parsed.data)) {
      if (value) {
        // Find the backend key for this MappedContact key
        const backendKey = CONTACT_KEYS[key as keyof typeof CONTACT_KEYS];
        if (backendKey) {
          contacts.push({ platform: backendKey, value });
        }
      }
    }

    const dto: SyncContactsDto = { contacts };
    await myProfileControllerSyncContacts(dto);
    return { success: true };
  } catch (error: unknown) {
    if (isNextRedirect(error)) throw error;
    console.error("[syncContactsAction] Error:", error);
    return { success: false, error: "SYNC_CONTACTS_FAILED" };
  }
}
