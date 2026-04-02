import { MeResponseDto } from "@/shared/open-api/models";

export type MyProfile = MeResponseDto;

export interface AppSession {
  myProfile: MyProfile | null;
}

export function isMyProfile(value: unknown): value is MyProfile {
  return (
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    typeof (value as Record<string, unknown>).id === "string"
  );
}
