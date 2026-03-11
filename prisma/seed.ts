import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  console.log("Clearing existing data...");
  await prisma.article.deleteMany();
  await prisma.coopItem.deleteMany();
  await prisma.pageContent.deleteMany();

  // 1. Seed Home Page Content
  const homeContentEn = await prisma.pageContent.upsert({
    where: { page_language: { page: "home", language: "en" } },
    update: {},
    create: {
      page: "home",
      language: "en",
      title: "MCP COOP DAO",
      subtitle: "Welcome to the decentralized future of cooperative management",
      description:
        "MCP COOP is a blockchain platform for transparent and efficient business development. " +
        "We create tools that help form teams of specialists amidst the transformation of traditional markets. " +
        "We believe the future belongs to AI business engineers: professionals who combine personal experience and logic with the capabilities of artificial intelligence to create products of any complexity.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: 'heading', level: 2, text: 'New opportunities for building your business' },
          { type: 'articles' }
        ]
      },
    },
  });
  console.log(`Created page content for: ${homeContentEn.page} (en)`);

  const homeContentRu = await prisma.pageContent.upsert({
    where: { page_language: { page: "home", language: "ru" } },
    update: {},
    create: {
      page: "home",
      language: "ru",
      title: "MCP COOP DAO",
      subtitle: "Добро пожаловать в децентрализованное будущее кооперативного управления ",
      description:
        "MCP COOP - это блокчейн-платформа для прозрачного и эффективного управления бизнесом. " +
        "Мы создаем инструменты, которые помогают формировать команды специалистов в условиях трансформации традиционных рынков. " +
        "Мы верим, что будущее за AI бизнес-инженерами: профессионалами, которые сочетают личный опыт и логику с возможностями искусственного интеллекта для создания продуктов любой сложности.",
      image: "/IMG_1163.JPG",
      jsonContent: {
        blocks: [
          { type: 'heading', level: 2, text: 'Новые возможности для создания бизнеса' },
          { type: 'articles' }
        ]
      },
    },
  });
  console.log(`Created page content for: ${homeContentRu.page} (ru)`);

  // 2. Seed some demo articles sequentially to ensure strictly ascending createdAt timestamps
  const articleCreators = [
    // ENGLISH ARTICLES
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Create Your Cooperative",
        subtitle: "Launch a DAO with ready-made infrastructure in one click",
        image: "handshake",
        jsonContent: { content: "Creating a cooperative takes a single transaction, deploying a standardized yet customizable smart contract with immutable baseline security rules. In your personal dashboard, you immediately access the entire infrastructure: shared treasury management, built-in voting, member onboarding, a Kanban board, and automated payout distribution. From day one, your cooperative is ready to manage finances and accept external payments in our network's stablecoins." },
        pageContentId: homeContentEn.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Find Your Dream Team",
        subtitle: "Work with the people you truly want to work with",
        image: "userSearch",
        jsonContent: { content: "The platform connects engineers, designers, and product teams from around the world. You can find cooperatives based on skills, reputation, and interesting projects, and join those whose goals align with yours. Instead of working for a random company, you choose the team you really want to build products with." },
        pageContentId: homeContentEn.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Built for AI Engineers",
        subtitle: "Infrastructure for small, highly efficient teams",
        image: "brainCircuit",
        jsonContent: { content: "Modern AI tools enable small teams to create products that previously required entire companies. The MCP Coop platform provides such teams with digital infrastructure for uniting, managing tasks, and distributing revenue. Engineers can form cooperatives, launch projects, and work directly with each other without intermediaries and corporate hierarchy." },
        pageContentId: homeContentEn.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Trust Through Code",
        subtitle: "Working rules encoded in the blockchain",
        image: "fileCodeCorner",
        jsonContent: { content: "All key interactions inside cooperatives are regulated by smart contracts deployed at the protocol level. They automatically record agreements, fund distribution, and task completion among participants. Thanks to this, working rules are enforced by code rather than trust between people, making collaboration transparent and predictable." },
        pageContentId: homeContentEn.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Build Products Together",
        subtitle: "New teams for new ways of production",
        image: "network",
        jsonContent: { content: "AI tools and modern technologies are radically changing how products are built. Today, small teams can ship projects that previously required large companies and complex organizational structures. MCP Coop provides people with the infrastructure to unite, coordinate work, and launch their own products directly — without corporate hierarchies and intermediaries." },
        pageContentId: homeContentEn.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "en",
        title: "Control Your Anonymity Level",
        subtitle: "Work under a wallet, reveal only what you deem necessary",
        image: "userKey",
        jsonContent: { content: "The system is based on identification via crypto wallet rather than real names. You can remain a fully anonymous network participant and represent yourself only through skills, roles, and reputation. At the same time, if you want, you can voluntarily add contacts, a portfolio, or external profiles to simplify collaboration with teams and clients." },
        pageContentId: homeContentEn.id,
      },
    }),

    // RUSSIAN ARTICLES
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Создай свой кооператив",
        subtitle: "Запусти DAO с готовой инфраструктурой в один клик",
        image: "handshake",
        jsonContent: { content: "Создание кооператива происходит через одну транзакцию, которая развертывает стандартизированный, но настраиваемый под вашу команду смарт-контракт с неизменными базовыми правилами безопасности. В личном кабинете вам сразу становится доступна вся инфраструктура: управление общей казной, встроенные голосования, прием участников, канбан-доска и автоматизированное распределение выплат. Ваш кооператив с первого дня готов работать с финансами и принимать внешние платежи в стейблкоинах нашей сети." },
        pageContentId: homeContentRu.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Найди команду мечты",
        subtitle: "Работай с теми, с кем действительно хочешь",
        image: "userSearch",
        jsonContent: { content: "Платформа объединяет инженеров, дизайнеров и продуктовые команды со всего мира. Ты можешь находить кооперативы по навыкам, репутации и интересным проектам и присоединяться к тем, чьи цели совпадают с твоими. Вместо работы на случайную компанию ты выбираешь команду, с которой действительно хочешь создавать продукты." },
        pageContentId: homeContentRu.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Создано для AI-инженеров",
        subtitle: "Инфраструктура для маленьких, высокоэффективных команд",
        image: "brainCircuit",
        jsonContent: { content: "Современные AI-инструменты позволяют небольшим командам создавать продукты, которые раньше требовали целых компаний. Платформа MCP Coop предоставляет таким командам цифровую инфраструктуру для объединения, управления задачами и распределения доходов. Инженеры могут формировать кооперативы, запускать проекты и работать напрямую друг с другом без посредников и корпоративной иерархии." },
        pageContentId: homeContentRu.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Доверие через код",
        subtitle: "Правила работы, закреплённые в блокчейне",
        image: "fileCodeCorner",
        jsonContent: { content: "Все ключевые взаимодействия внутри кооперативов регулируются смарт-контрактами, развернутыми на уровне протокола. Они автоматически фиксируют договорённости, распределение средств и выполнение задач между участниками. Благодаря этому правила работы исполняются кодом, а не доверием между людьми, что делает сотрудничество прозрачным и предсказуемым." },
        pageContentId: homeContentRu.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Создавайте продукты вместе",
        subtitle: "Новые команды для новых способов производства",
        image: "network",
        jsonContent: { content: "AI-инструменты и современные технологии радикально меняют то, как создаются продукты. Сегодня небольшие команды могут реализовывать проекты, которые раньше требовали больших компаний и сложной организационной структуры. MCP Coop даёт людям инфраструктуру, чтобы объединяться, координировать работу и запускать собственные продукты напрямую — без корпоративной иерархии и посредников" },
        pageContentId: homeContentRu.id,
      },
    }),
    () => prisma.article.create({
      data: {
        language: "ru",
        title: "Контролируй свой уровень анонимности",
        subtitle: "Работай под кошельком, раскрывай только то, что считаешь нужным",
        image: "userKey",
        jsonContent: { content: "В основе системы — идентификация через криптокошелёк, а не через реальные имена. Ты можешь оставаться полностью анонимным участником сети и представлять себя только через навыки, роль и репутацию. При этом, если захочешь, ты можешь добровольно добавить контакты, портфолио или внешние профили, чтобы упростить сотрудничество с командами и заказчиками." },
        pageContentId: homeContentRu.id,
      },
    }),
  ];

  const articles = [];
  for (const creatorFn of articleCreators) {
    articles.push(await creatorFn());
    // Small delay to guarantee sequential ordering of createdAt timestamps
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  console.log(`Created ${articles.length} test articles.`);

  // 3. Seed Cooperative Items
  const coops = await Promise.all([
    prisma.coopItem.create({
      data: {
        language: "en",
        name: "EcoFarm Collective",
        address: "0x1234...abcd",
        description: "A cooperative focused on sustainable and organic farming practices within the blockchain ecosystem.",
        image: "https://images.unsplash.com/photo-1530836369250-ef71a359071c?w=500&auto=format&fit=crop",
      },
    }),
    prisma.coopItem.create({
      data: {
        language: "en",
        name: "Tech DAO Builders",
        address: "0x9876...efab",
        description: "Building open source tools for decentralized autonomous organizations.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop",
      },
    }),
  ]);
  console.log(`Created ${coops.length} test coops.`);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
