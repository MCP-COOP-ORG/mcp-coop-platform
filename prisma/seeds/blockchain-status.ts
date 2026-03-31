import { PrismaClient } from "../../generated/prisma/client";

export async function seedBlockchainStatus(prisma: PrismaClient) {
  console.log("Seeding Blockchain Status page content...");

  const blockStatusContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "blockchain-status", language: "en" } },
    update: {},
    create: {
      page: "blockchain-status",
      language: "en",
      title: "Blockchain Status",
      subtitle: "Live metrics and network health",
      description: "Monitor the performance of the MCP COOP protocol on the blockchain. Check TPS, smart contract deployments, gas fees, and ongoing community governance proposals in real-time.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: "heading", level: 2, text: "Network Overview" },
          { type: "articles" }
        ]
      },
    },
  });
  console.log(`Created page content for: ${blockStatusContentEn.page} (en)`);

  const blockStatusContentRu = await prisma.pageContent.upsert({
    where: { page_language: { page: "blockchain-status", language: "ru" } },
    update: {},
    create: {
      page: "blockchain-status",
      language: "ru",
      title: "Блокчейн статус",
      subtitle: "Текущие метрики и состояние сети",
      description: "Отслеживайте производительность протокола MCP COOP в блокчейне. Проверяйте TPS, развертывание смарт-контрактов, комиссии за газ и текущие предложения управления сообществом в реальном времени.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: "heading", level: 2, text: "Обзор сети" },
          { type: "articles" }
        ]
      },
    },
  });
  console.log(`Created page content for: ${blockStatusContentRu.page} (ru)`);

  const articleCreators = [
    // ENGLISH ARTICLES
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Latest Network Upgrades",
        subtitle: "Recent deployments to the mainnet",
        image: "network",
        jsonContent: { content: "Our core protocol has just been upgraded with layer-2 optimizations, reducing gas costs for cooperative formation by over 40%. The new smart contracts are fully audited and operational." },
        pageContentId: blockStatusContentEn.id,
      },
    }),
    // RUSSIAN ARTICLES
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Последние обновления сети",
        subtitle: "Недавние развертывания в основной сети",
        image: "network",
        jsonContent: { content: "Наш основной протокол только что был обновлен с помощью оптимизаций второго уровня (L2), что снизило затраты на транзакции для создания кооперативов более чем на 40%. Новые смарт-контракты полностью проверены (аудиты) и работают." },
        pageContentId: blockStatusContentRu.id,
      },
    }),
  ];

  const articles = [];
  for (const creatorFn of articleCreators) {
    articles.push(await creatorFn());
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  console.log(`Created ${articles.length} test articles for Blockchain Status.`);
}
