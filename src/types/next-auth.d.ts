import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      profileId: string;
      tgId?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    profileId: string;
    tgId?: string | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    profileId: string;
    tgId?: string | null;
  }
}
