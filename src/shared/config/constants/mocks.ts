import { CatalogItemData } from "@/shared/ui/components/card-catalog";

export const MOCK_COOPS: CatalogItemData[] = [
  {
    id: "mcp-coop-mock",
    avatarUrl: "/logo.png",
    name: "MCP COOP DAO",
    description: "MCP COOP DAO is a decentralized cooperative ecosystem built on the principles of mutual value creation. We provide an open platform for collective ownership, transparent governance, and collaborative development. Join our network to participate in shaping a fair and sustainable digital future.",
    categories: ["IT", "Consulting", "Finance Legal"],
    members: [
      { id: "m1", name: "Vitali Shpakowski", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d", role: "Frontend" },
      { id: "m2", name: "Alex", avatarUrl: "https://i.pravatar.cc/150?u=a04258a2462d826712d", role: "Backend" },
      { id: "m3", name: "Elena", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d", role: "UI/UX" },
      { id: "m4", name: "Sergey", avatarUrl: "https://i.pravatar.cc/150?u=a048581f4e29026701d", role: "Backend" },
      { id: "m5", name: "Anna", avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026702d", role: "QA" },
      { id: "m6", name: "Ivan", avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026708c", role: "DevOps" },
      { id: "m7", name: "Dmitry", avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026302d", role: "PM" },
    ],
    wallets: {
      solana: { address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", isPrimary: true },
      bitcoin: { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
      ethereum: { address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
      ton: { address: "EQBvW8Z5huBkMJYdnfAEM5JqCot01hX1A1B4pD1121" },
    },
    contacts: {
      telegram: "https://t.me/example",
      whatsapp: null,
      viber: null,
      phone: null,
      email: "mailto:test@example.com",
      instagram: null,
      facebook: null,
      linkedin: "https://linkedin.com/in/example",
    },
    skills: [
      { id: "react", name: "React" },
      { id: "angular", name: "Angular" },
      { id: "next", name: "Next.js" },
      { id: "nest", name: "NestJS" },
      { id: "node", name: "Node.js" },
      { id: "googlecloud", name: "Google Cloud" },
      { id: "html", name: "HTML5" },
      { id: "css", name: "CSS3" },
      { id: "nginx", name: "Nginx" },
      { id: "docker", name: "Docker" },
      { id: "go", name: "Go" }
    ]
  }
];

export const MOCK_MEMBERS: CatalogItemData[] = [
  {
    id: "member-mock",
    avatarUrl: "",
    name: "Vitali Shpakowski",
    description: "Experienced Web3 specialist focusing on frontend architecture and smart contract integration. Passionate about building seamless decentralized applications and scaling cooperative networks.",
    categories: ["IT"],
    wallets: {
      solana: { address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", isPrimary: true },
      bitcoin: { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
      ethereum: { address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
      ton: { address: "EQBvW8Z5huBkMJYdnfAEM5JqCot01hX1A1B4pD1121" },
    },
    contacts: {
      telegram: "https://t.me/example",
      whatsapp: null,
      viber: null,
      phone: null,
      email: "mailto:test@example.com",
      instagram: "https://instagram.com/example",
      facebook: null,
      linkedin: "https://linkedin.com/in/example",
    },
    skills: [
      { id: "react", name: "React", category: "Frontend" },
      { id: "angular", name: "Angular", category: "Frontend" },
      { id: "next", name: "Next.js", category: "Frontend" },
      { id: "nest", name: "NestJS", category: "Backend" },
      { id: "node", name: "Node.js", category: "Backend" },
      { id: "docker", name: "Docker", category: "DevOps" },
      { id: "go", name: "Go", category: "Backend" },
    ]
  }
];
