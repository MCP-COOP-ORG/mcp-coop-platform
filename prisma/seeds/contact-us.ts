import { PrismaClient } from "../../generated/prisma/client";

const CONTACT_CONTENT_RU = {
  highlightWords: ["задачу", "сроки", "стоимость"],
  hero: {
    title: "Свяжитесь с нами",
    subtitle: "Опишите задачу или идею вашего продукта.\nМы ответим в течение пары часов, чтобы обсудить детали, сроки и стоимость разработки.",
  }
};

const CONTACT_CONTENT_EN = {
  highlightWords: ["architecture", "timeline", "budget"],
  hero: {
    title: "Contact Us",
    subtitle: "Tell us about your project or product idea.\nWe'll get back to you within a couple of hours to discuss architecture, timeline, and budget.",
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
