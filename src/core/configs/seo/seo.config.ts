import type { Metadata, Viewport } from "next";

export const APP_NAME = "MCP COOP DAO";
export const APP_DESCRIPTION = "Decentralized infrastructure for AI engineers and product teams. Create cooperatives, find partners, and launch onchain products.";

export const viewportConfig: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadataConfig: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  keywords: [
    "DAO",
    "MCP COOP",
    "Blockchain",
    "Cooperative",
    "AI Engineers",
    "Web3",
    "Smart Contracts",
    "Decentralized",
    "Crypto",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: APP_NAME,
    description: "Decentralized infrastructure for AI engineers and product teams.",
    siteName: APP_NAME,
    images: [{ url: "/logo.png" }],
    type: "website",
  },
};
