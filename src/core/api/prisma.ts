import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Global Prisma client singleton.
 *
 * - Avoids creating a new DB connection on every hot-reload in development.
 * - Safe to import and use from both API routes and NextAuth configuration.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Next.js build uses dummy database string, so we instantiate normally.
// In runtime, this will throw connection errors if it cannot reach DB, which is standard.
const connectionString = process.env.DATABASE_URL || "postgresql://dummy";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
