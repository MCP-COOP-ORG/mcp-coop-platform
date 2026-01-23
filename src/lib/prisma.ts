import { PrismaClient } from "../../generated/prisma/client";

/**
 * Global Prisma client singleton.
 *
 * - Avoids creating a new DB connection on every hot-reload in development.
 * - Safe to import and use from both API routes and NextAuth configuration.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

