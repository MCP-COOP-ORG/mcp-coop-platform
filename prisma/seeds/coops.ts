import { PrismaClient } from "../../generated/prisma/client";

export async function seedCoops(prisma: PrismaClient) {
  console.log("Seeding Cooperative Items...");

  // Seed PageContent for 'coops' layout
  const coopsContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "coops", language: "en" } },
    update: {
      title: "All COOPs",
      subtitle: "Discover cooperatives matching your skills",
      description: "Explore the comprehensive catalog of cutting-edge e-Coop organizations powered by the MCP Coop Chain. Every cooperative in our registry functions as a transparent technology startup or a standalone digital product, managed exclusively on-chain with absolute financial openness. Discover ideal decentralized projects, B2B services, and ecosystem cooperatives to build robust partnerships in the new digital economy."
    },
    create: {
      page: "coops",
      language: "en",
      title: "All COOPs",
      subtitle: "Discover cooperatives matching your skills",
      description: "Explore the comprehensive catalog of cutting-edge e-Coop organizations powered by the MCP Coop Chain. Every team in our registry operates as a fully transparent business, managed exclusively on-chain with verifiable finances, autonomous governance, and an immutable reputation. Discover your ideal technology partners, AI engineers, and domain experts to build products of any complexity in the new decentralized cooperative economy.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: "heading", level: 2, text: "Explore Network" }
        ]
      },
    },
  });
  console.log(`Created page content for: ${coopsContentEn.page} (en)`);

  const coopsContentRu = await prisma.pageContent.upsert({
    where: { page_language: { page: "coops", language: "ru" } },
    update: {
      title: "Команды",
      subtitle: "Найдите кооператив по вашим навыкам",
      description: "Исследуйте глобальный каталог передовых e-Coop организаций на базе MCP Coop Chain. Каждый кооператив в нашем реестре — это прозрачный технологический стартап или масштабный цифровой продукт, управляемый смарт-контрактами с абсолютной финансовой открытостью. Находите идеальные децентрализованные проекты, B2B-сервисы и независимые кооперативы для надежного партнерства."
    },
    create: {
      page: "coops",
      language: "ru",
      title: "Команды",
      subtitle: "Найдите кооператив по вашим навыкам",
      description: "Исследуйте глобальный каталог передовых e-Coop организаций на базе MCP Coop Chain. Каждый кооператив в нашем реестре — это прозрачный технологический стартап или масштабный цифровой продукт, управляемый смарт-контрактами с абсолютной финансовой открытостью. Находите идеальные децентрализованные проекты, B2B-сервисы и независимые кооперативы для надежного партнерства.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: "heading", level: 2, text: "Обзор сети" }
        ]
      },
    },
  });
  console.log(`Created page content for: ${coopsContentRu.page} (ru)`);

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
}
