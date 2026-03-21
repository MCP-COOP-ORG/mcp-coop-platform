import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type { MyProfile } from "@/shared/types/next-auth";

/**
 * Edge-compatible Auth.js configuration.
 * Used in middleware and edge routes.
 * Does not include Prisma or other Node.js-only dependencies.
 */
export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // authorize is not needed here for middleware - it's only used during signIn
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.myProfile) {
        token.myProfile = user.myProfile;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.myProfile) {
        session.myProfile = token.myProfile as MyProfile;
      }
      // Strip default NextAuth user object entirely per user request safely
      delete (session as unknown as { user?: unknown }).user;
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600 * 24 * 7, // 7 days in seconds to better match typical APIs
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
