import { PrismaClient } from "../../generated/prisma/client";

const MEMBERS_CONTENT_RU = {
  highlightWords: ["инженеры", "разработчики", "комьюнити", "кооперативу"],
  hero: {
    title: "Специалисты сообщества",
    subtitle: "Здесь представлены проверенные инженеры и разработчики \nнашего комьюнити, готовые присоединиться к вашему кооперативу \nдля создания выдающихся продуктов.",
  }
};

const MEMBERS_CONTENT_EN = {
  highlightWords: ["engineers", "developers", "community", "coop"],
  hero: {
    title: "Community Specialists",
    subtitle: "Here you can find verified engineers and developers of our community, \nready to join your coop to build outstanding products.",
  }
};

export async function seedMembers(prisma: PrismaClient) {
  console.log("Seeding Members configs...");

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "members", language: "en" } },
    update: { jsonContent: MEMBERS_CONTENT_EN },
    create: {
      pageName: "members",
      language: "en",
      jsonContent: MEMBERS_CONTENT_EN,
    },
  });
  console.log(`Created page configuration for: members (en)`);

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "members", language: "ru" } },
    update: { jsonContent: MEMBERS_CONTENT_RU },
    create: {
      pageName: "members",
      language: "ru",
      jsonContent: MEMBERS_CONTENT_RU,
    },
  });
  console.log(`Created page configuration for: members (ru)`);
}
