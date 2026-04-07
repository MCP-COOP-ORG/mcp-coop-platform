import { PrismaClient } from "../../generated/prisma/client";

const BLOCKCHAIN_STATUS_CONTENT_RU = {
  highlightWords: ["MCP Coop Chain", "в реальном времени"],
  hero: {
    title: "Статус сети",
    subtitle: "Мониторинг состояния и производительности MCP Coop Chain.\nСледите за глобальными метриками блокчейна в реальном времени, включая TPS и доступность узлов."
  }
};

const BLOCKCHAIN_STATUS_CONTENT_EN = {
  highlightWords: ["MCP Coop Chain", "real-time"],
  hero: {
    title: "Network Status",
    subtitle: "Live performance and health monitoring of the MCP Coop Chain.\nTrack global blockchain metrics in real-time, including transaction throughput and node availability."
  }
};

export async function seedBlockchainStatus(prisma: PrismaClient) {
  console.log("Seeding Blockchain Status configs...");

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "blockchain-status", language: "en" } },
    update: { jsonContent: BLOCKCHAIN_STATUS_CONTENT_EN },
    create: {
      pageName: "blockchain-status",
      language: "en",
      jsonContent: BLOCKCHAIN_STATUS_CONTENT_EN,
    },
  });
  console.log(`Created page configuration for: blockchain-status (en)`);

  await prisma.page.upsert({
    where: { pageName_language: { pageName: "blockchain-status", language: "ru" } },
    update: { jsonContent: BLOCKCHAIN_STATUS_CONTENT_RU },
    create: {
      pageName: "blockchain-status",
      language: "ru",
      jsonContent: BLOCKCHAIN_STATUS_CONTENT_RU,
    },
  });
  console.log(`Created page configuration for: blockchain-status (ru)`);
}
