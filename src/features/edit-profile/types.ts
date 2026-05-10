import type { MappedContacts, MappedWallets } from "@/shared/mappers";
import type { ProfileFullData } from "@/entities/profiles/types";

export interface EditGeneralFormData {
  fullName: string;
  username: string;
  headline: string;
  shortDescription: string;
  location: string;
  timezone: string;
  availabilityStatus: string;
  languages: string[];
}

export type EditContactsFormData = MappedContacts;

export type EditWalletsFormData = MappedWallets;

export interface SelectedSkill {
  name: string;
  level: number;
  id: string;
  category: string;
  iconUrl: string | null;
}

export interface EditExperienceFormData {
  id?: string;
  companyName: string;
  projectRole: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills: SelectedSkill[];
}

export interface SkillCatalogItem {
  id: string;
  name: string;
  category: string;
  iconUrl: string | null;
}

export interface EditProfileState {
  isLoading: boolean;
  isSaving: boolean;
  profile: ProfileFullData | null;
  error: string | null;
}
