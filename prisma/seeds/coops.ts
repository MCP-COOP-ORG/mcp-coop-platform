import { PrismaClient } from "../../generated/prisma/client";

const COOPS_CONTENT_RU = {
  highlightWords: ["комьюнити", "кооперативы", "команды разработчиков"],
  hero: {
    title: "Кооперативы и Команды",
    subtitle: "Здесь представлены кооперативы нашего комьюнити, \nсоздающие собственные продукты, и команды разработчиков \nдля ваших проектов.",
  }
};

const COOPS_CONTENT_EN = {
  highlightWords: ["community", "coops", "development teams"],
  hero: {
    title: "Coops & Teams",
    subtitle: "Here you can find coops of our community \nbuilding their own products,and development teams ready \nfor your projects.",
  }
};

export async function seedCoops(prisma: PrismaClient) {
  console.log("Seeding Coops configs...");

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "coops", language: "en" } },
    update: { jsonContent: COOPS_CONTENT_EN },
    create: {
      pageName: "coops",
      language: "en",
      jsonContent: COOPS_CONTENT_EN,
    },
  });
  console.log(`Created page configuration for: coops (en)`);

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "coops", language: "ru" } },
    update: { jsonContent: COOPS_CONTENT_RU },
    create: {
      pageName: "coops",
      language: "ru",
      jsonContent: COOPS_CONTENT_RU,
    },
  });
  console.log(`Created page configuration for: coops (ru)`);
}
