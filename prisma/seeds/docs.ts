import { PrismaClient } from "../../generated/prisma/client";
import docsRuJson from "./docs.ru.json";
import docsEnJson from "./docs.en.json";

export async function seedDocs(prisma: PrismaClient) {
  console.log("Seeding Docs page content...");

  const docsContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "docs", language: "en" } },
    update: {
      jsonContent: docsEnJson,
    },
    create: {
      page: "docs",
      language: "en",
      title: "Blockchain documentation",
      subtitle: "Explore the infrastructure enabling autonomous teams to build, govern, and scale without intermediaries.",
      description: "MCP COOP is an ecosystem designed to give autonomous teams—particularly AI engineers—the digital infrastructure they need to build enterprise-scale products. Our blockchain protocol replaces traditional corporate hierarchy with code, utilizing smart contracts as an immutable legal baseline.\n\nEvery interaction, from treasury management to task completion and voting, is transparently recorded on-chain. This provides guaranteed protocol-level execution, ensuring that agreements are honored automatically.\n\nThrough these decentralized workspaces, developers can focus on innovation rather than bureaucracy. Read on to discover how our network secures transparency and protocol-legal protection for every cooperative.",
      jsonContent: docsEnJson,
    },
  });
  console.log(`Created page content for: ${docsContentEn.page} (en)`);



  const docsContentRu = await prisma.pageContent.upsert({
    where: { page_language: { page: "docs", language: "ru" } },
    update: {
      jsonContent: docsRuJson,
    },
    create: {
      page: "docs",
      language: "ru",
      title: "Архитектура блокчейна",
      subtitle: "Децентрализованная инфраструктура для управления проектами и кооперативами без посредников.",
      description: "Главная задача нашего блокчейна — дать командам независимую среду, где каждое правило жестко прописано в коде, а не на бумаге. Платформа MCP COOP работает поверх смарт-контрактов, которые выступают в роли системы правосудия и гаранта честности для всех участников кооператива.\n\nМы заменяем классическую корпоративную иерархию неизменяемыми программными алгоритмами. Когда вы разворачиваете кооператив, в блокчейне инициализируется набор смарт-контрактов, которые прозрачно контролируют всю вашу разработку. Распределение бюджета из казны, принятие решений через голосования и автоматические выплаты за закрытые задачи — всё это записывается в публичный реестр (ончейн).\n\nТакой подход дает протокольную и юридическую защиту: никто не сможет в одностороннем порядке поменять правила игры, подделать отчеты или заблокировать ваши средства. Децентрализованная сеть обеспечивает 100% прозрачность рабочих процессов, позволяя командам спокойно фокусироваться на создании сложных продуктов.",
      jsonContent: docsRuJson,
    },
  });
  console.log(`Created page content for: ${docsContentRu.page} (ru)`);
}
