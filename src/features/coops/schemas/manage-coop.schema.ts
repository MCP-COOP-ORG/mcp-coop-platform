import { z } from "zod";

export const coopGeneralSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(1000),
  website: z.union([z.string().url("Must be a valid URL").max(255), z.literal("")]).optional().transform(v => v === "" ? undefined : v),
  logoUrl: z.union([z.string().url("Must be a valid URL"), z.literal("")]).optional().transform(v => v === "" ? undefined : v),
});

export const coopCategoriesSchema = z.object({
  categories: z.array(z.string()).max(10, "Maximum 10 categories allowed"),
});

export const coopContactsSchema = z.object({
  contacts: z.array(
    z.object({
      platform: z.string().min(1, "Platform is required").max(100),
      value: z.string().min(1, "Value is required").max(200),
    })
  ).max(20, "Maximum 20 contacts allowed"),
});

export const coopWalletsSchema = z.object({
  wallets: z.array(
    z.object({
      network: z.string().min(1, "Network is required").max(50),
      address: z.string().min(1, "Address is required").max(100),
      isPrimary: z.boolean(),
    })
  ).max(20, "Maximum 20 wallets allowed"),
});

export const createCoopSchema = coopGeneralSchema.extend({
  categories: z.array(z.string()).optional(),
});

// Full state schema for frontend react-hook-form
export const manageCoopFormSchema = z.object({
  general: coopGeneralSchema,
  categories: coopCategoriesSchema,
  contacts: coopContactsSchema,
  wallets: coopWalletsSchema,
});

export type ManageCoopFormValues = z.input<typeof manageCoopFormSchema>;
