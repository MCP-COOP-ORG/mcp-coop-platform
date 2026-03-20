import { DefaultSession, DefaultUser } from "next-auth";

export interface ProfileSettings {
  language?: string;
  theme?: string;
  lastActiveWorkspaceId?: string;
  [key: string]: any;
}

export interface MyProfile {
  id: string;
  email: string;
  fullName: string | null;
  username: string | null;
  tgId: string | null;
  settings: ProfileSettings | null;
}

declare module "next-auth" {
  interface Session extends Omit<DefaultSession, "user"> {
    myProfile?: MyProfile;
  }

  interface User extends DefaultUser {
    myProfile?: MyProfile;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    myProfile?: MyProfile;
  }
}
