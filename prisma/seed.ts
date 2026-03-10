import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

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

  // 1. Seed Home Page Content
  const homeContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "home", language: "en" } },
    update: {},
    create: {
      page: "home",
      language: "en",
      title: "MCP COOP DAO",
      subtitle: "Welcome to the decentralized future of cooperative management",
      description:
        "MCP COOP is a blockchain platform for transparent and efficient business development. " +
        "We create tools that help form teams of specialists amidst the transformation of traditional markets. " +
        "We believe the future belongs to AI business engineers: professionals who combine personal experience and logic with the capabilities of artificial intelligence to create products of any complexity.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: 'heading', level: 2, text: 'New opportunities for building your business' },
          { type: 'articles' }
        ]
      },
    },
  });
  console.log(`Created page content for: ${homeContentEn.page} (en)`);

  const homeContentRu = await prisma.pageContent.upsert({
    where: { page_language: { page: "home", language: "ru" } },
    update: {},
    create: {
      page: "home",
      language: "ru",
      title: "MCP COOP DAO",
      subtitle: "Добро пожаловать в децентрализованное будущее кооперативного управления ",
      description:
        "MCP COOP - это блокчейн-платформа для прозрачного и эффективного управления бизнесом. " +
        "Мы создаем инструменты, которые помогают формировать команды специалистов в условиях трансформации традиционных рынков. " +
        "Мы верим, что будущее за AI бизнес-инженерами: профессионалами, которые сочетают личный опыт и логику с возможностями искусственного интеллекта для создания продуктов любой сложности.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: 'heading', level: 2, text: 'Новые возможности для создания бизнеса' },
          { type: 'articles' }
        ]
      },
    },
  });
  console.log(`Created page content for: ${homeContentRu.page} (ru)`);

  // 2. Seed some demo articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        language: "en",
        title: "Understanding Next.js 15 Server Components",
        subtitle: "A deep dive into the new App Router architecture",
        image: "users",
        jsonContent: { content: "Draft content..." },
        pageContentId: homeContentEn.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "en",
        title: "Dockerizing Node Applications",
        subtitle: "Best practices for multi-stage builds",
        image: "users",
        jsonContent: { content: "Draft content..." },
        pageContentId: homeContentEn.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "en",
        title: "Dockerizing Node Applications",
        subtitle: "Best practices for multi-stage builds",
        image: "users",
        jsonContent: { content: "Draft content..." },
        pageContentId: homeContentEn.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "en",
        title: "Dockerizing Node Applications",
        subtitle: "Best practices for multi-stage builds",
        image: "users",
        jsonContent: { content: "Draft content..." },
        pageContentId: homeContentEn.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "en",
        title: "Dockerizing Node Applications",
        subtitle: "Best practices for multi-stage builds",
        image: "users",
        jsonContent: { content: "Draft content..." },
        pageContentId: homeContentEn.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "en",
        title: "Dockerizing Node Applications",
        subtitle: "Best practices for multi-stage builds",
        image: "users",
        jsonContent: { content: "Draft content..." },
        pageContentId: homeContentEn.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "ru",
        title: "Понимание Next.js 15 Server Components",
        subtitle: "Глубокое погружение в новую архитектуру App Router",
        image: "box",
        jsonContent: { content: "Черновик..." },
        pageContentId: homeContentRu.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "ru",
        title: "Докеризация Node приложений",
        subtitle: "Лучшие практики для многоэтапных сборок",
        image: "layers",
        jsonContent: { content: "Черновик..." },
        pageContentId: homeContentRu.id,
      },
    }),
    prisma.article.create({
      data: {
        language: "ru",
        title: "Смарт-контракты",
        subtitle: "Как писать смарт-контракты для кооперативов",
        image: "book",
        jsonContent: { content: "Черновик..." },
        pageContentId: homeContentRu.id,
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
