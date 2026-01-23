import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

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
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour in seconds
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
