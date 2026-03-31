import { PrismaClient } from "../../generated/prisma/client";

export async function seedCoops(prisma: PrismaClient) {
  console.log("Seeding Cooperative Items...");

  // Seed PageContent for 'coops' layout
  const coopsContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "coops", language: "en" } },
    update: {},
    create: {
      page: "coops",
      language: "en",
      title: "All COOPs",
      subtitle: "Discover cooperatives matching your skills",
      description: "Explore ongoing projects and decentralized communities building tools for the future in the MCP COOP platform.",
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
    update: {},
    create: {
      page: "coops",
      language: "ru",
      title: "Все кооперативы",
      subtitle: "Найдите кооператив по вашим навыкам",
      description: "Исследуйте текущие проекты и децентрализованные сообщества, создающие инструменты для будущего на платформе MCP COOP.",
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
