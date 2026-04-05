import type { MyProfileData } from "@/entities/profiles/types";

export type MyProfile = MyProfileData;

export interface AppSession {
  myProfile: MyProfile | null;
}
