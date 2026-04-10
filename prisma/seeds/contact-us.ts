import { PrismaClient } from "../../generated/prisma/client";

const CONTACT_CONTENT_RU = {
  highlightWords: ["вопросы", "предложения", "свяжемся"],
  hero: {
    title: "Свяжитесь с нами",
    subtitle: "Остались вопросы или есть предложения? Заполните форму, \nи мы свяжемся с вами в ближайшее время.",
  }
};

const CONTACT_CONTENT_EN = {
  highlightWords: ["questions", "suggestions", "get back"],
  hero: {
    title: "Contact Us",
    subtitle: "Have any questions or suggestions? Fill out the form, \nand we will get back to you shortly.",
  }
};

export async function seedContactUs(prisma: PrismaClient) {
  console.log("Seeding Contact Us configs...");

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "contact-us", language: "en" } },
    update: { jsonContent: CONTACT_CONTENT_EN },
    create: {
      pageName: "contact-us",
      language: "en",
      jsonContent: CONTACT_CONTENT_EN,
    },
  });
  console.log(`Created page configuration for: contact-us (en)`);

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "contact-us", language: "ru" } },
    update: { jsonContent: CONTACT_CONTENT_RU },
    create: {
      pageName: "contact-us",
      language: "ru",
      jsonContent: CONTACT_CONTENT_RU,
    },
  });
  console.log(`Created page configuration for: contact-us (ru)`);
}
