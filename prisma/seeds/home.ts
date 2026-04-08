import { PrismaClient } from "../../generated/prisma/client";

const HOME_PAGE_CONTENT_RU = {
  highlightWords: ["Твой"],
  hero: {
    tagline: "Твой кооператив | Твой труд | Твой продукт",
    subtitle: "Наша платформа помогает найти команду, чтобы создавать продукты вместе",
    buttonText: "НАЧАТЬ",
  },
  features: [
    {
      id: "experience",
      title: "Инженерный фокус",
      description: "Направь свою инженерную энергию и навыки на создание продуктов, в которые ты по-настоящему веришь."
    },
    {
      id: "coop",
      title: "Сотрудничество",
      description: "Создай свой кооператив для разработки приложений и стартапов в команде, где мнение каждого ценно."
    },
    {
      id: "ai-tools",
      title: "AI Экспертиза",
      description: "AI дал нам возможность создавать масштабные продукты, оставаясь небольшой профессиональной командой."
    }
  ],
  roadmapSection: {
    title: "Дорожная Карта",
    releaseDate: "Бета релиз: 1 мая 2026",
    goals: [
      { id: "g1", goal: "Запуск беты платформы и отладка офф-чейн модулей", completed: false, endDate: "1 июня 2026" },
      { id: "g2", goal: "Старт блокчейн-сети: развертывание и стабилизация сид-ноды", completed: false, endDate: "1 июля 2026" },
      { id: "g3", goal: "Масштабирование ядра: расширение протокольных смарт-контрактов", completed: false, endDate: "1 августа 2026" },
      { id: "g4", goal: "Он-чейн интеграция: привязка API и начало обработки транзакций", completed: false, endDate: "1 сентября 2026" },
      { id: "g5", goal: "Модуль самоуправления: запуск DAO и панелей управления кооперативами", completed: false, endDate: "1 октября 2026" },
      { id: "g6", goal: "Глобальный аудит: комплексное и нагрузочное тестирование экосистемы", completed: false, endDate: "1 ноября 2026" },
      { id: "g7", goal: "Public Launch: открытый доступ к платформе и децентрализованной сети", completed: false, endDate: "1 декабря 2026" },
      { id: "g8", goal: "Web3 Экосистема: релиз переносимых DAO-виджетов и мобильного приложения", completed: false, endDate: "1 января 2027" }
    ]
  },
  articlesSection: {
    title: "Новые возможности для совместной разработки продуктов",
    articles: [
      {
        id: "create-coop",
        title: "Создай свой кооператив",
        subtitle: "Запусти DAO с готовой инфраструктурой в один клик",
        icon: "handshake",
        content: "Создание кооператива происходит через одну транзакцию, которая развертывает стандартизированный, но настраиваемый под вашу команду смарт-контракт с неизменными базовыми правилами безопасности. В своем личном воркспейсе вам сразу становится доступна вся инфраструктура: управление общей казной, встроенные голосования, прием участников, канбан-доска и автоматизированное распределение выплат. Ваш кооператив с первого дня готов работать с финансами и принимать внешние платежи в стейблкоинах нашей сети."
      },
      {
        id: "find-team",
        title: "Найди команду мечты",
        subtitle: "Работай с теми, с кем действительно хочешь",
        icon: "userSearch",
        content: "Платформа объединяет инженеров, дизайнеров и продуктовые команды со всего мира. Ты можешь находить кооперативы по навыкам, репутации и интересным проектам и присоединяться к тем, чьи цели совпадают с твоими. Вместо работы на случайную компанию ты выбираешь команду, с которой действительно хочешь создавать продукты."
      },
      {
        id: "ai-engineers",
        title: "Создано для AI-инженеров",
        subtitle: "Инфраструктура для маленьких, высокоэффективных команд",
        icon: "brainCircuit",
        content: "Современные AI-инструменты позволяют небольшим командам создавать продукты, которые раньше требовали целых компаний. Платформа MCP Coop предоставляет таким командам цифровую инфраструктуру для объединения, управления задачами и распределения доходов. Инженеры могут формировать кооперативы, запускать проекты и работать напрямую друг с другом без посредников и корпоративной иерархии."
      },
      {
        id: "trust-code",
        title: "Доверие через код",
        subtitle: "Правила работы, закреплённые в блокчейне",
        icon: "fileCodeCorner",
        content: "Все ключевые взаимодействия внутри кооперативов регулируются смарт-контрактами, развернутыми на уровне протокола. Они автоматически фиксируют договорённости, распределение средств и выполнение задач между участниками. Благодаря этому правила работы исполняются кодом, а не доверием между людьми, что делает сотрудничество прозрачным и предсказуемым."
      },
      {
        id: "build-together",
        title: "Создавайте продукты вместе",
        subtitle: "Новые команды для новых способов производства",
        icon: "network",
        content: "AI-инструменты и современные технологии радикально меняют то, как создаются продукты. Сегодня небольшие команды могут реализовывать проекты, которые раньше требовали больших компаний и сложной организационной структуры. MCP Coop даёт людям инфраструктуру, чтобы объединяться, координировать работу и запускать собственные продукты напрямую — без корпоративной иерархии и посредников."
      },
      {
        id: "anonymity",
        title: "Контролируй свой уровень анонимности",
        subtitle: "Работай под кошельком, раскрывай только то, что считаешь нужным",
        icon: "userKey",
        content: "В основе системы — идентификация через криптокошелёк, а не через реальные имена. Ты можешь оставаться полностью анонимным участником сети и представлять себя только через навыки, роль и репутацию. При этом, если захочешь, ты можешь добровольно добавить контакты, портфолио или внешние профили, чтобы упростить сотрудничество с командами и заказчиками."
      }
    ]
  }
};

const HOME_PAGE_CONTENT_EN = {
  highlightWords: ["Your"],
  hero: {
    tagline: "Your coop | Your work | Your product",
    subtitle: "Our platform helps you find a team to build apps together",
    buttonText: "GET STARTED",
  },
  features: [
    {
      id: "experience",
      title: "Engineering Focus",
      description: "Channel your engineering skills into building products you truly believe in."
    },
    {
      id: "coop",
      title: "Coloboration",
      description: "Create your own coop to build apps and startups in a team where everyone's opinion is valued."
    },
    {
      id: "ai-tools",
      title: "AI Expertise",
      description: "AI has unlocked the ability to build massive products as a small, professional team."
    }
  ],
  roadmapSection: {
    title: "Roadmap",
    releaseDate: "Beta release: May 1, 2026",
    goals: [
      { id: "g1", goal: "Platform Beta Launch & Core Off-Chain Debugging", completed: false, endDate: "June 1, 2026" },
      { id: "g2", goal: "Blockchain Genesis: Seed Node Deployment & Stabilization", completed: false, endDate: "July 1, 2026" },
      { id: "g3", goal: "Core Protocol: Smart Contract Expansion & Upgrades", completed: false, endDate: "August 1, 2026" },
      { id: "g4", goal: "On-Chain Sync: API Integration & Transaction Processing", completed: false, endDate: "September 1, 2026" },
      { id: "g5", goal: "Self-Governance Module: DAO & Cooperative Workspaces Launch", completed: false, endDate: "October 1, 2026" },
      { id: "g6", goal: "Global Audit: Comprehensive Ecosystem Stress Testing", completed: false, endDate: "November 1, 2026" },
      { id: "g7", goal: "Public Launch: Open Access to Platform & Blockchain Network", completed: false, endDate: "December 1, 2026" },
      { id: "g8", goal: "Web3 Mobile Ecosystem: DAO Widgets & Mobile App Release", completed: false, endDate: "January 1, 2027" }
    ]
  },
  articlesSection: {
    title: "New opportunities for collaborative product development",
    articles: [
      {
        id: "create-coop",
        title: "Create Your Cooperative",
        subtitle: "Launch a DAO with ready-made infrastructure in one click",
        icon: "handshake",
        content: "Creating a cooperative takes a single transaction, deploying a standardized yet customizable smart contract with immutable baseline security rules. In your personal workspace, you immediately access the entire infrastructure: shared treasury management, built-in voting, member onboarding, a Kanban board, and automated payout distribution. From day one, your cooperative is ready to manage finances and accept external payments in our network's stablecoins."
      },
      {
        id: "find-team",
        title: "Find Your Dream Team",
        subtitle: "Work with the people you truly want to work with",
        icon: "userSearch",
        content: "The platform connects engineers, designers, and product teams from around the world. You can find cooperatives based on skills, reputation, and interesting projects, and join those whose goals align with yours. Instead of working for a random company, you choose the team you really want to build products with."
      },
      {
        id: "ai-engineers",
        title: "Built for AI Engineers",
        subtitle: "Infrastructure for small, highly efficient teams",
        icon: "brainCircuit",
        content: "Modern AI tools enable small teams to create products that previously required entire companies. The MCP Coop platform provides such teams with digital infrastructure for uniting, managing tasks, and distributing revenue. Engineers can form cooperatives, launch projects, and work directly with each other without intermediaries and corporate hierarchy."
      },
      {
        id: "trust-code",
        title: "Trust Through Code",
        subtitle: "Working rules encoded in the blockchain",
        icon: "fileCodeCorner",
        content: "All key interactions inside cooperatives are regulated by smart contracts deployed at the protocol level. They automatically record agreements, fund distribution, and task completion among participants. Thanks to this, working rules are enforced by code rather than trust between people, making collaboration transparent and predictable."
      },
      {
        id: "build-together",
        title: "Build Products Together",
        subtitle: "New teams for new ways of production",
        icon: "network",
        content: "AI tools and modern technologies are radically changing how products are built. Today, small teams can ship projects that previously required large companies and complex organizational structures. MCP Coop provides people monitoring with the infrastructure to unite, coordinate work, and launch their own products directly — without corporate hierarchies and intermediaries."
      },
      {
        id: "anonymity",
        title: "Control Your Anonymity Level",
        subtitle: "Work under a wallet, reveal only what you deem necessary",
        icon: "userKey",
        content: "The system is based on identification via crypto wallet rather than real names. You can remain a fully anonymous network participant and represent yourself only through skills, roles, and reputation. At the same time, if you want, you can voluntarily add contacts, a portfolio, or external profiles to simplify collaboration with teams and clients."
      }
    ]
  }
};

export async function seedHome(prisma: PrismaClient) {
  console.log("Seeding Home page (Page model)...");

  const homeEN = await prisma.page.upsert({
    where: { pageName_language: { pageName: "home", language: "en" } },
    update: {
      jsonContent: HOME_PAGE_CONTENT_EN,
    },
    create: {
      pageName: "home",
      language: "en",
      jsonContent: HOME_PAGE_CONTENT_EN,
    },
  });

  const homeRU = await prisma.page.upsert({
    where: { pageName_language: { pageName: "home", language: "ru" } },
    update: {
      jsonContent: HOME_PAGE_CONTENT_RU,
    },
    create: {
      pageName: "home",
      language: "ru",
      jsonContent: HOME_PAGE_CONTENT_RU,
    },
  });

  console.log(`Created new clean Page for: ${homeEN.pageName} (en) & ${homeRU.pageName} (ru)`);
}
