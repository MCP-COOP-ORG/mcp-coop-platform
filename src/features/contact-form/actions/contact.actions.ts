"use server";

import type { ContactFormData } from "@/shared/constants/form";

/**
 * Server Action for contact form submission.
 * Currently stores in DB or sends to external service — to be implemented.
 * Returns field-level errors on failure.
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<{ errors?: Record<string, string> }> {
  // Guard: basic server-side validation
  if (!data.firstName || !data.email) {
    return {
      errors: {
        email: "validationFailed",
      },
    };
  }

  try {
    // TODO: Replace with real implementation (Prisma insert or external API call)
    // For now, log and return success to unblock the form flow
    console.log("Contact form submission received:", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hasMessage: Boolean(data.message),
      hasFile: Boolean(data.file),
    });

    return {};
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return {
      errors: {
        email: "failedSubmit",
      },
    };
  }
}
