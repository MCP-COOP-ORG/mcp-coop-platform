import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // 1. Seed Home Page Content
  const homeContent = await prisma.pageContent.upsert({
    where: { page: "home" },
    update: {},
    create: {
      page: "home",
      language: "en",
      title: "Welcome to MCP COOP Blockchain",
      subtitle: "The decentralized future of cooperative management",
      description: "MCP COOP is a blockchain-based platform designed to organize and manage cooperatives transparently and efficiently.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop",
      jsonContent: { blocks: [] },
    },
  });
  console.log(`Created page content for: ${homeContent.page}`);

  // 2. Seed some demo articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        language: "en",
        title: "Understanding Next.js 15 Server Components",
        subtitle: "A deep dive into the new App Router architecture",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
        jsonContent: { content: "Draft content..." },
      },
    }),
    prisma.article.create({
      data: {
        language: "en",
        title: "Dockerizing Node Applications",
        subtitle: "Best practices for multi-stage builds",
        image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop",
        jsonContent: { content: "Draft content..." },
      },
    }),
  ]);
  console.log(`Created ${articles.length} test articles.`);

  // 3. Seed Cooperative Items
  const coops = await Promise.all([
    prisma.coopItem.create({
      data: {
        language: "en",
        name: "EcoFarm Collective",
        address: "0x1234...abcd",
        description: "A cooperative focused on sustainable and organic farming practices within the blockchain ecosystem.",
        image: "https://images.unsplash.com/photo-1530836369250-ef71a359071c?w=500&auto=format&fit=crop",
      },
    }),
    prisma.coopItem.create({
      data: {
        language: "en",
        name: "Tech DAO Builders",
        address: "0x9876...efab",
        description: "Building open source tools for decentralized autonomous organizations.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop",
      },
    }),
  ]);
  console.log(`Created ${coops.length} test coops.`);

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
