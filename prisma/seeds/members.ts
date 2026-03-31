import { PrismaClient } from "../../generated/prisma/client";

export async function seedMembers(prisma: PrismaClient) {
  console.log("Seeding Members Items...");

  // Seed PageContent for 'members' layout
  const membersContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "members", language: "en" } },
    update: {
      title: "Our Specialists",
      subtitle: "Find the right experts for your cooperative",
      description: "Explore the global registry of verified specialists, developers, and engineers ready to join new decentralized businesses. Invite talents with proven on-chain reputation to build the next generation of e-Coops together."
    },
    create: {
      page: "members",
      language: "en",
      title: "Our Specialists",
      subtitle: "Find the right experts for your cooperative",
      description: "Explore the global registry of verified specialists, developers, and engineers ready to join new decentralized businesses. Invite talents with proven on-chain reputation to build the next generation of e-Coops together.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: "heading", level: 2, text: "Explore Talents" }
        ]
      },
    },
  });
  console.log(`Created page content for: ${membersContentEn.page} (en)`);

  const membersContentRu = await prisma.pageContent.upsert({
    where: { page_language: { page: "members", language: "ru" } },
    update: {
      title: "Наши Специалисты",
      subtitle: "Найдите экспертов для вашего кооператива",
      description: "Исследуйте глобальный реестр проверенных специалистов, разработчиков и инженеров, готовых присоединиться к новым децентрализованным бизнесам. Приглашайте таланты с подтвержденной on-chain репутацией для совместного создания продуктов будущего."
    },
    create: {
      page: "members",
      language: "ru",
      title: "Наши Специалисты",
      subtitle: "Найдите экспертов для вашего кооператива",
      description: "Исследуйте глобальный реестр проверенных специалистов, разработчиков и инженеров, готовых присоединиться к новым децентрализованным бизнесам. Приглашайте таланты с подтвержденной on-chain репутацией для совместного создания продуктов будущего.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: "heading", level: 2, text: "Обзор специалистов" }
        ]
      },
    },
  });
  console.log(`Created page content for: ${membersContentRu.page} (ru)`);
}
