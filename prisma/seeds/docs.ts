import { PrismaClient } from "../../generated/prisma/client";
import docsRuJson from "./docs.ru.json";
import docsEnJson from "./docs.en.json";

export async function seedDocs(prisma: PrismaClient) {
  console.log("Seeding Docs page content...");

  const contentEn = {
    hero: {
      title: "Blockchain documentation",
      subtitle: "Explore the infrastructure enabling autonomous teams to build, govern, and scale without intermediaries.",
      description: "MCP COOP is an ecosystem designed to give autonomous teams—particularly AI engineers—the digital infrastructure they need to build enterprise-scale products. Our blockchain protocol replaces traditional corporate hierarchy with code, utilizing smart contracts as an immutable legal baseline.\n\nEvery interaction, from treasury management to task completion and voting, is transparently recorded on-chain. This provides guaranteed protocol-level execution, ensuring that agreements are honored automatically.\n\nThrough these decentralized workspaces, developers can focus on innovation rather than bureaucracy. Read on to discover how our network secures transparency and protocol-legal protection for every cooperative."
    },
    contentTree: docsEnJson
  };

  const docsPageEn = await prisma.page.upsert({
    where: { pageName_language: { pageName: "docs", language: "en" } },
    update: {
      jsonContent: contentEn,
    },
    create: {
      pageName: "docs",
      language: "en",
      jsonContent: contentEn,
    },
  });
  console.log(`Created page configuration for: ${docsPageEn.pageName} (en)`);



  const contentRu = {
    hero: {
      title: "Документация блокчейна",
      subtitle: "Децентрализованная инфраструктура для управления проектами и кооперативами без посредников.",
      description: "Главная задача нашего блокчейна — дать командам независимую среду, где каждое правило жестко прописано в коде, а не на бумаге. Платформа MCP COOP работает поверх смарт-контрактов, которые выступают в роли системы правосудия и гаранта честности для всех участников кооператива.\n\nМы заменяем классическую корпоративную иерархию неизменяемыми программными алгоритмами. Когда вы разворачиваете кооператив, в блокчейне инициализируется набор смарт-контрактов, которые прозрачно контролируют всю вашу разработку. Распределение бюджета из казны, принятие решений через голосования и автоматические выплаты за закрытые задачи — всё это записывается в публичный реестр (ончейн).\n\nТакой подход дает протокольную и юридическую защиту: никто не сможет в одностороннем порядке поменять правила игры, подделать отчеты или заблокировать ваши средства. Децентрализованная сеть обеспечивает 100% прозрачность рабочих процессов, позволяя командам спокойно фокусироваться на создании сложных продуктов."
    },
    contentTree: docsRuJson
  };

  const docsPageRu = await prisma.page.upsert({
    where: { pageName_language: { pageName: "docs", language: "ru" } },
    update: {
      jsonContent: contentRu,
    },
    create: {
      pageName: "docs",
      language: "ru",
      jsonContent: contentRu,
    },
  });
  console.log(`Created page configuration for: ${docsPageRu.pageName} (ru)`);
}
