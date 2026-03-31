import { PrismaClient } from "../../generated/prisma/client";

export async function seedBlockchainStatus(prisma: PrismaClient) {
  console.log("Seeding Blockchain Status page content...");

  const blockStatusContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "blockchain-status", language: "en" } },
    update: {
      title: "Network Status",
      subtitle: "Live metrics and blockchain health",
      description: "Monitor the real-time operational status, network performance, and overall health of the MCP Coop Chain. Here you can always verify the active state of our infrastructure. Below, you will find a live dashboard displaying various global blockchain metrics, transaction throughput, and node availability."
    },
    create: {
      page: "blockchain-status",
      language: "en",
      title: "Network Status",
      subtitle: "Live metrics and blockchain health",
      description: "Monitor the real-time operational status, network performance, and overall health of the MCP Coop Chain. Here you can always verify the active state of our infrastructure. Below, you will find a live dashboard displaying various global blockchain metrics, transaction throughput, and node availability.",
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
    update: {
      title: "Статус сети",
      subtitle: "Текущие метрики и состояние блокчейна",
      description: "Здесь вы всегда можете проверить текущее состояние работы, производительность и общее здоровье MCP Coop Chain. Наша инфраструктура работает прозрачно — ниже будет представлен дашборд с ключевыми показателями блокчейна в реальном времени, включая пропускную способность транзакций (TPS) и аптайм узлов."
    },
    create: {
      page: "blockchain-status",
      language: "ru",
      title: "Статус сети",
      subtitle: "Текущие метрики и состояние блокчейна",
      description: "Здесь вы всегда можете проверить текущее состояние работы, производительность и общее здоровье MCP Coop Chain. Наша инфраструктура работает прозрачно — ниже будет представлен дашборд с ключевыми показателями блокчейна в реальном времени, включая пропускную способность транзакций (TPS) и аптайм узлов.",
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
