import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Import Modular Seeding Functions
import { seedHome } from "./seeds/home";
import { seedDocs } from "./seeds/docs";
import { seedBlockchainStatus } from "./seeds/blockchain-status";
import { seedCoops } from "./seeds/coops";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  console.log("Clearing existing data...");
  await prisma.article.deleteMany();
  await prisma.coopItem.deleteMany();
  await prisma.pageContent.deleteMany();

  // Modular Page Seeding logic
  await seedHome(prisma);
  await seedDocs(prisma);
  await seedBlockchainStatus(prisma);

  // Other components
  await seedCoops(prisma);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
