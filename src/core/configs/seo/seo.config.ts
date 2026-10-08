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
    "разработка веб-сервисов",
    "создание мобильных приложений",
    "разработка приложений под ключ",
    "разработка MVP для стартапа",
    "AI решения для бизнеса",
    "команда инженеров",
    "заказная разработка",
    "Next.js",
    "iOS разработка",
    "SwiftUI",
    "Flutter",
    "MCP COOP",
    "Model Context Protocol",
  ],
  icons: {
    icon: APP_INFO.logo,
    shortcut: APP_INFO.logo,
    apple: APP_INFO.logo,
  },
  openGraph: {
    title: APP_INFO.fullName,
    description: APP_INFO.description,
    siteName: APP_INFO.shortName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: APP_INFO.logo }],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_INFO.fullName,
    description: APP_INFO.description,
    images: [APP_INFO.logo],
  },
};
