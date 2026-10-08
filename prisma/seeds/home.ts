import { PrismaClient } from "../../generated/prisma/client";
import type { HomePageJsonContent } from "../../src/entities/page-content/types";

const HOME_PAGE_CONTENT_RU = {
  highlightWords: ["БИЗНЕСА"],
  hero: {
    tagline: "КОМАНДА ИНЖЕНЕРОВ ДЛЯ ВАШЕГО БИЗНЕСА",
    subtitle: "Опытные разработчики с многолетним стажем создания реальных продуктов. Берем на себя весь цикл — от проектирования до запуска и поддержки, подбирая надежные решения под ваш бюджет.",
    buttonText: "СВЯЗАТЬСЯ С НАМИ",
  },
  features: [
    {
      id: "web",
      title: "ВЕБ-РАЗРАБОТКА",
      description: "Создаем современные онлайн-сервисы, веб-платформы и промо-сайты любой сложности для бизнеса. Разрабатываем надежную серверную часть, быстрые интерфейсы и базы данных, рассчитанные на стабильную работу при росте нагрузок."
    },
    {
      id: "ai",
      title: "AI-РЕШЕНИЯ",
      description: "Мы сами ежедневно используем AI в работе, ускоряя и удешевляя разработку без потери качества. Поэтому мы точно знаем, как практично внедрить нейросети в ваш бизнес: автоматизировать рутину, запустить умных ассистентов и дать вашему продукту технологическое преимущество."
    },
    {
      id: "mobile",
      title: "МОБИЛЬНАЯ РАЗРАБОТКА",
      description: "Создаем оптимизированные мобильные приложения под iOS и Android с продуманным UX. Закрываем весь путь под ключ: от логики и подключения оплат до успешного релиза в App Store и Google Play и поддержки после запуска."
    }
  ],
  agentBuilderSection: {
    title: "Agent Builder",
    description: "Представляем MCP COOP Agent Builder — наш новый веб-инструмент для визуальной сборки AI-агентов под ваши задачи.\nБольше никаких абстрактных ИИ-ассистентов: система генерирует готовое решение на основе вашего стека, избавляя от необходимости постоянно искать подходящий набор навыков и правил.\nПереходите на AI-Driven Development для создания продуктов, соответствующих лучшим стандартам разработки.",
    buttonText: "Попробовать сейчас",
    highlightWords: ['MCP COOP Agent Builder', 'визуальной сборки', 'готовое решение', 'AI-Driven Development', 'лучшим стандартам'],
  },
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
  },
  projectsSection: {
    title: "Наши проекты",
    subtitle: "Продукты и архитектурные решения, созданные нашей командой",
    categories: [
      { id: "all", label: "Все" },
      { id: "web", label: "Web" },
      { id: "ios", label: "iOS" },
      { id: "ai", label: "AI" },
      { id: "backend", label: "Backend" },
    ],
    projects: [
      {
        id: "ai-agent-orchestrator",
        specId: "SYS-01",
        title: "AI Agent Orchestrator",
        description: "Распределенная среда координации автономных ИИ-агентов с поддержкой протокола MCP, динамическим планированием графа задач и контролем контекста.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        categories: ["ai", "backend", "web"],
        techStack: ["Next.js 15", "TypeScript", "Python", "FastAPI", "LangGraph", "Docker"],
        links: {
          liveUrl: "https://agent-builder.mcpcoop.org",
          githubUrl: "https://github.com/MCP-COOP-DAO/agent-builder",
        },
      },
      {
        id: "mobile-crypto-wallet",
        specId: "SYS-02",
        title: "Decentralized Mobile Wallet",
        description: "Нативный некастодиальный криптокошелек с поддержкой Account Abstraction (ERC-4337), биометрическим подтверждением ключей через Secure Enclave и оффлайн-подписью транзакций.",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        categories: ["ios"],
        techStack: ["SwiftUI", "Combine", "TCA", "Web3.swift", "CryptoKit", "CoreData"],
        links: {
          liveUrl: "https://apps.apple.com",
          githubUrl: "https://github.com/MCP-COOP-DAO/mcp-wallet-ios",
        },
      },
      {
        id: "distributed-task-engine",
        specId: "SYS-03",
        title: "Distributed Task Engine",
        description: "Высоконагруженный распределенный движок фоновых задач и очередей с гарантией at-least-once доставки, консенсусом Raft и автоматическим шардированием воркеров.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        categories: ["backend"],
        techStack: ["Go", "gRPC", "Redis", "PostgreSQL", "Kafka", "Prometheus"],
        links: {
          liveUrl: "https://status.mcpcoop.org",
          githubUrl: "https://github.com/MCP-COOP-DAO/task-engine",
        },
      },
      {
        id: "dao-governance-platform",
        specId: "SYS-04",
        title: "DAO Governance Platform",
        description: "Он-чейн платформа децентрализованного управления кооперативами: квадратичное голосование, делегирование голосов через snapshot-пруфы и казначейские мультисиг-хранилища.",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
        categories: ["web", "backend"],
        techStack: ["React 19", "Next.js", "Tailwind CSS", "Solidity", "Viem", "Prisma"],
        links: {
          liveUrl: "https://mcpcoop.org/coops",
          githubUrl: "https://github.com/MCP-COOP-DAO/mcp-coop-platform",
        },
      },
      {
        id: "neural-knowledge-mesh",
        specId: "SYS-05",
        title: "Neural Knowledge Mesh",
        description: "Векторный поисковый движок и база знаний на базе гибридного RAG: семантическая индексация технической документации в реальном времени с квантованными эмбеддингами.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        categories: ["ai", "backend", "web"],
        techStack: ["Python", "Qdrant", "Rust", "TypeScript", "OpenAI API", "Hugging Face"],
        links: {
          liveUrl: "https://docs.mcpcoop.org",
          githubUrl: "https://github.com/MCP-COOP-DAO/knowledge-mesh",
        },
      },
    ],
  },
  teamSection: {
    title: "Наша команда",
    subtitle: "Специалисты, которые проектируют и развивают наши продукты",
    members: [
      {
        id: "vitali-shpakowski",
        name: "Vitali Shpakowski",
        role: "Tech Lead & System Architect",
        experience: "10+ лет опыта",
        photoUrl: "https://avatars.githubusercontent.com/u/3286958?v=4",
        techStack: ["Architecture", "TypeScript", "Next.js", "Go", "PostgreSQL", "Docker"],
        links: {
          github: "https://github.com/Shpakowski",
          linkedin: "https://www.linkedin.com/in/vitali-shpakowski-73256568/",
          telegram: "https://t.me/Shpakich_BLR",
        },
      },
      {
        id: "alex-smirnov",
        name: "Alex Smirnov",
        role: "Senior iOS Engineer",
        experience: "8+ лет опыта",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        techStack: ["Swift", "SwiftUI", "Combine", "TCA", "CoreData", "Metal"],
        links: {
          github: "https://github.com/alex-smirnov-ios",
          linkedin: "https://linkedin.com/in/alex-smirnov-ios",
          telegram: "https://t.me/alex_smirnov_ios",
        },
      },
      {
        id: "elena-rostova",
        name: "Elena Rostova",
        role: "Senior AI / Backend Engineer",
        experience: "8+ лет опыта",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        techStack: ["Python", "PyTorch", "LangGraph", "FastAPI", "Rust", "Vector DBs"],
        links: {
          github: "https://github.com/elena-rostova-ai",
          linkedin: "https://linkedin.com/in/elena-rostova-ai",
          telegram: "https://t.me/elena_rostova_ai",
        },
      },
    ],
  },
} satisfies HomePageJsonContent;

const HOME_PAGE_CONTENT_EN = {
  highlightWords: ["Your"],
  hero: {
    tagline: "Your coop\u00A0\u00A0\u00A0 Your work\u00A0\u00A0\u00A0 Your product",
    subtitle: "Our platform helps you find a team to build apps together",
    buttonText: "CONTACT US",
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
  agentBuilderSection: {
    title: "Agent Builder",
    description: "Introducing MCP COOP Agent Builder — our new web tool for visually assembling AI agents tailored to your needs.\nNo more abstract AI assistants: the system generates a ready-to-use solution based on your tech stack, eliminating the need to constantly search for the right set of skills and rules.\nEmbrace AI-Driven Development to build products that meet the highest engineering standards.",
    buttonText: "Try it now",
    highlightWords: ['MCP COOP Agent Builder', 'visually assembling', 'ready-to-use solution', 'AI-Driven Development', 'highest engineering standards'],
  },
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
  },
  projectsSection: {
    title: "Our Projects",
    subtitle: "Products and architectural solutions built by our team",
    categories: [
      { id: "all", label: "All" },
      { id: "web", label: "Web" },
      { id: "ios", label: "iOS" },
      { id: "ai", label: "AI" },
      { id: "backend", label: "Backend" },
    ],
    projects: [
      {
        id: "ai-agent-orchestrator",
        specId: "SYS-01",
        title: "AI Agent Orchestrator",
        description: "Distributed runtime for autonomous AI agent coordination featuring MCP protocol support, dynamic DAG execution, and strict context management.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        categories: ["ai", "backend", "web"],
        techStack: ["Next.js 15", "TypeScript", "Python", "FastAPI", "LangGraph", "Docker"],
        links: {
          liveUrl: "https://agent-builder.mcpcoop.org",
          githubUrl: "https://github.com/MCP-COOP-DAO/agent-builder",
        },
      },
      {
        id: "mobile-crypto-wallet",
        specId: "SYS-02",
        title: "Decentralized Mobile Wallet",
        description: "Native non-custodial Web3 wallet powered by ERC-4337 Account Abstraction, Secure Enclave biometric key signing, and air-gapped transaction verification.",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        categories: ["ios"],
        techStack: ["SwiftUI", "Combine", "TCA", "Web3.swift", "CryptoKit", "CoreData"],
        links: {
          liveUrl: "https://apps.apple.com",
          githubUrl: "https://github.com/MCP-COOP-DAO/mcp-wallet-ios",
        },
      },
      {
        id: "distributed-task-engine",
        specId: "SYS-03",
        title: "Distributed Task Engine",
        description: "High-throughput distributed background task scheduler featuring at-least-once delivery guarantees, Raft consensus, and autonomous worker sharding.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        categories: ["backend"],
        techStack: ["Go", "gRPC", "Redis", "PostgreSQL", "Kafka", "Prometheus"],
        links: {
          liveUrl: "https://status.mcpcoop.org",
          githubUrl: "https://github.com/MCP-COOP-DAO/task-engine",
        },
      },
      {
        id: "dao-governance-platform",
        specId: "SYS-04",
        title: "DAO Governance Platform",
        description: "On-chain cooperative governance suite offering quadratic voting, snapshot-proof delegation, and automated multi-signature treasury execution.",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
        categories: ["web", "backend"],
        techStack: ["React 19", "Next.js", "Tailwind CSS", "Solidity", "Viem", "Prisma"],
        links: {
          liveUrl: "https://mcpcoop.org/coops",
          githubUrl: "https://github.com/MCP-COOP-DAO/mcp-coop-platform",
        },
      },
      {
        id: "neural-knowledge-mesh",
        specId: "SYS-05",
        title: "Neural Knowledge Mesh",
        description: "Real-time hybrid RAG vector search engine for technical documentation, featuring quantized embeddings, graph retrieval, and sub-10ms response latency.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        categories: ["ai", "backend", "web"],
        techStack: ["Python", "Qdrant", "Rust", "TypeScript", "OpenAI API", "Hugging Face"],
        links: {
          liveUrl: "https://docs.mcpcoop.org",
          githubUrl: "https://github.com/MCP-COOP-DAO/knowledge-mesh",
        },
      },
    ],
  },
  teamSection: {
    title: "Our Team",
    subtitle: "Specialists who design and build our products",
    members: [
      {
        id: "vitali-shpakowski",
        name: "Vitali Shpakowski",
        role: "Tech Lead & System Architect",
        experience: "10+ years exp",
        photoUrl: "https://avatars.githubusercontent.com/u/3286958?v=4",
        techStack: ["Architecture", "TypeScript", "Next.js", "Go", "PostgreSQL", "Docker"],
        links: {
          github: "https://github.com/Shpakowski",
          linkedin: "https://www.linkedin.com/in/vitali-shpakowski-73256568/",
          telegram: "https://t.me/Shpakich_BLR",
        },
      },
      {
        id: "alex-smirnov",
        name: "Alex Smirnov",
        role: "Senior iOS Engineer",
        experience: "8+ years exp",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        techStack: ["Swift", "SwiftUI", "Combine", "TCA", "CoreData", "Metal"],
        links: {
          github: "https://github.com/alex-smirnov-ios",
          linkedin: "https://linkedin.com/in/alex-smirnov-ios",
          telegram: "https://t.me/alex_smirnov_ios",
        },
      },
      {
        id: "elena-rostova",
        name: "Elena Rostova",
        role: "Senior AI / Backend Engineer",
        experience: "8+ years exp",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        techStack: ["Python", "PyTorch", "LangGraph", "FastAPI", "Rust", "Vector DBs"],
        links: {
          github: "https://github.com/elena-rostova-ai",
          linkedin: "https://linkedin.com/in/elena-rostova-ai",
          telegram: "https://t.me/elena_rostova_ai",
        },
      },
    ],
  },
} satisfies HomePageJsonContent;

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
