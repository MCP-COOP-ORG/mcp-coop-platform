/**
 * Application-level auth types.
 * Decoupled from any auth library — these are OUR domain types.
 */

export interface ProfileSettings {
  language?: string;
  theme?: string;
  lastActiveWorkspaceId?: string;
  [key: string]: unknown;
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
