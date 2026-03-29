export interface ProfileSettings {
  lastActiveWorkspaceId?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface MyProfile {
  id: string;
  email: string;
  fullName: string | null;
  username: string | null;
  tgId: string | null;
  settings: ProfileSettings | null;
}

export interface AppSession {
  myProfile: MyProfile | null;
}

export function isMyProfile(value: unknown): value is MyProfile {
  return (
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    typeof (value as Record<string, unknown>).id === "string" &&
    "email" in value &&
    typeof (value as Record<string, unknown>).email === "string"
  );
}
