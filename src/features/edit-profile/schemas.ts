import { z } from "zod";

export const editGeneralSchema = z.object({
  fullName: z.string().max(100).catch(""),
  username: z.string().max(100).catch(""),
  headline: z.string().max(100).catch(""),
  shortDescription: z.string().max(2000).catch(""),
  location: z.string().max(100).catch(""),
  timezone: z.string().max(100).catch(""),
  availabilityStatus: z.string().max(100).catch(""),
  languages: z.array(z.string()).catch([]),
});

export const selectedSkillSchema = z.object({
  name: z.string(),
  level: z.number().min(1).max(5),
  id: z.string(),
  category: z.string(),
  iconUrl: z.string().nullable().optional(),
});

export const editExperienceSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, "Company name is required").max(100),
  projectRole: z.string().min(1, "Project role is required").max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().nullable().optional(),
  description: z.string().max(2000).catch(""),
  skills: z.array(selectedSkillSchema).catch([]),
});

export const editContactsSchema = z.record(z.string(), z.string().nullable().optional());

export const editWalletsSchema = z.record(
  z.string(),
  z.object({
    address: z.string().optional(),
    isPrimary: z.boolean().optional(),
  })
);

export const syncSkillsSchema = z.array(
  z.object({
    skillId: z.string(),
    level: z.number().min(1).max(5),
  })
);
