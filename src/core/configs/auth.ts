import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { AuthService } from "@/features/auth/api/auth.api";

/**
 * Full Auth.js configuration.
 * Used in Server Components, API routes, and Server Actions.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // AuthService handles the API fetch and HttpOnly cookie proxying automatically.
          const data = await AuthService.login({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          
          if (!data || !data.user || !data.user.profileId) {
             throw new CredentialsSignin("Invalid response from server");
          }

          return {
            id: data.user.profileId,
            profileId: data.user.profileId,
            tgId: data.user.tgId,
            email: data.user.email,
            name: data.user.fullName || data.user.email, // Best effort for name
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          }
          console.error("Auth Error:", error);
          throw new CredentialsSignin("Authentication service unavailable");
        }
      },
    }),
  ],
});