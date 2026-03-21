import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { AuthService } from "@/features/auth/api/auth.api";
import { authCredentialsSchema } from "@/features/auth/validation";
import { AUTH_PROVIDER, AUTH_ERRORS } from "@/shared/constants/auth";

/**
 * Full Auth.js configuration.
 * Used in Server Components, API routes, and Server Actions.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: AUTH_PROVIDER.name,
      credentials: AUTH_PROVIDER.fields,
      authorize: async (credentials) => {
        try {
          // Validate credentials with Zod instead of unsafe `as string` casts
          const parsed = authCredentialsSchema.safeParse(credentials);
          if (!parsed.success) {
            throw new CredentialsSignin(AUTH_ERRORS.invalidCredentialsFormat);
          }

          // AuthService handles the API fetch and HttpOnly cookie proxying automatically.
          const data = await AuthService.login({
            email: parsed.data.email,
            password: parsed.data.password,
          });
          
          if (!data || !data.myProfile || !data.myProfile.id) {
             throw new CredentialsSignin(AUTH_ERRORS.invalidServerResponse);
          }

          return {
            id: data.myProfile.id,
            myProfile: data.myProfile,
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          }
          console.error("Auth Error:", error);
          throw new CredentialsSignin(AUTH_ERRORS.serviceUnavailable);
        }
      },
    }),
  ],
});