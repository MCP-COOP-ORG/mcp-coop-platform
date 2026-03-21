import type { Metadata, Viewport } from "next";
import { APP_INFO } from "@/shared/constants/app-info";

export const viewportConfig: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadataConfig: Metadata = {
  title: APP_INFO.fullName,
  description: APP_INFO.description,
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
    icon: APP_INFO.logo,
    shortcut: APP_INFO.logo,
    apple: APP_INFO.logo,
  },
  openGraph: {
    title: APP_INFO.fullName,
    description: APP_INFO.description,
    siteName: APP_INFO.fullName,
    images: [{ url: APP_INFO.logo }],
    type: "website",
  },
};
