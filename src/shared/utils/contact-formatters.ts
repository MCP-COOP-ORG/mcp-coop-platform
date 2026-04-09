import type { ContactKey } from "@/shared/constants/contacts";

/**
 * Normalizer for user contact input:
 * Converts raw strings (@username, +123, email@test, http://link) into strictly valid, actionable URLs.
 */
export function formatContactUrl(platform: string, rawValue: string): string {
  const value = rawValue.trim();
  if (!value) return "";

  // If the user already provided a fully qualified valid URL schema, try to use it
  if (value.startsWith("http://") || value.startsWith("https://") && platform !== "email") {
    return value;
  }

  // Pre-clean standard Handles
  const cleanHandle = value.startsWith("@") ? value.slice(1) : value;

  switch (platform.toLowerCase() as Lowercase<ContactKey>) {
    case "email":
      return value.startsWith("mailto:") ? value : `mailto:${value}`;

    case "phone": {
      const digits = value.replace(/[^\d+]/g, "");
      return `tel:${digits}`;
    }

    case "whatsapp": {
      // wa.me doesn't like '+' prefixes or spaces
      const waDigits = value.replace(/[^\d]/g, "");
      return `https://wa.me/${waDigits}`;
    }

    case "viber": {
      // viber://chat?number= expects exactly a phone number. '+' is usually URL-encoded if strictly needed,
      // but most modern viber clients handle pure numbers perfectly without '+' if country code is present.
      const viDigits = value.replace(/[^\d+]/g, "");
      // Easiest is to encodeURIComponent if it contains a `+`
      return `viber://chat?number=${encodeURIComponent(viDigits)}`;
    }

    case "telegram":
      // t.me expects the handle without @
      return `https://t.me/${cleanHandle}`;

    case "instagram":
      return `https://instagram.com/${cleanHandle}`;

    case "facebook":
      // Sometimes users put "facebook.com/user". If it has a root domain, just append https.
      if (value.includes("facebook.com")) {
        return value.startsWith("http") ? value : `https://${value}`;
      }
      return `https://facebook.com/${cleanHandle}`;

    case "linkedin":
      if (value.includes("linkedin.com")) {
        return value.startsWith("http") ? value : `https://${value}`;
      }
      return `https://linkedin.com/in/${cleanHandle}`;

    default:
      // Fallback
      if (value.includes("@") && !value.includes("/")) {
        // Looks like an email but unknown platform
        return `mailto:${value}`;
      }
      return value.startsWith("http") ? value : `https://${value}`;
  }
}
