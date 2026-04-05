import { z } from "zod";

/**
 * Reusable Zod schema for UUID v4 validation.
 * Guard Clause: prevents garbage IDs from reaching the API layer.
 */
export const uuidSchema = z.string().uuid("Invalid UUID format");
