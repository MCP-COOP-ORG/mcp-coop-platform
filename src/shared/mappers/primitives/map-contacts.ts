import { CONTACT_KEYS } from "@/shared/constants/contacts";
import type { MappedContacts } from "./types";

/**
 * Adapter: maps the backend open-ended contacts dict { [key: string]: unknown }
 * to a strict MappedContacts shape used across all UI components.
 *
 * Unknown keys are safely discarded — the mapper is the only place that
 * needs updating when the backend adds a new contact type.
 */
export function mapContacts(
  raw: Record<string, unknown> | null | undefined,
): MappedContacts {
  const pick = (key: string): string | null => {
    const val = raw?.[key];
    return typeof val === "string" && val.trim() !== "" ? val : null;
  };

  return {
    telegram: pick(CONTACT_KEYS.telegram),
    whatsapp: pick(CONTACT_KEYS.whatsapp),
    viber: pick(CONTACT_KEYS.viber),
    phone: pick(CONTACT_KEYS.phone),
    email: pick(CONTACT_KEYS.email),
    instagram: pick(CONTACT_KEYS.instagram),
    facebook: pick(CONTACT_KEYS.facebook),
    linkedin: pick(CONTACT_KEYS.linkedin),
  };
}
