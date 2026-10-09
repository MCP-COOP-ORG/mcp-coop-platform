import type { Metadata, Viewport } from "next";
import { APP_INFO } from "@/shared/constants/app-info";

export const SITE_URL = "https://mcpcoop.org";

export const viewportConfig: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function getLocalizedMetadata(locale: string = "ru"): Metadata {
  const isEn = locale === "en";

  const title = isEn
    ? "MCP COOP — Engineering team for your business | Web, Mobile & AI"
    : APP_INFO.fullName;

  const description = isEn
    ? "Engineering team delivering scalable web services, platforms, promotional sites, mobile apps (iOS/Android), and applied AI solutions for business."
    : APP_INFO.description;

  const keywords = isEn
    ? [
        "web development",
        "mobile app development",
        "custom software development",
        "startup MVP development",
        "AI solutions for business",
        "engineering team",
        "custom software development services",
        "Next.js",
        "iOS development",
        "SwiftUI",
        "Flutter",
        "MCP COOP",
        "Model Context Protocol",
      ]
    : [
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
      ];

  const canonicalUrl = `${SITE_URL}/${isEn ? "en" : "ru"}`;
  const ogLocale = isEn ? "en_US" : "ru_RU";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
      },
    },
    icons: {
      icon: APP_INFO.logo,
      shortcut: APP_INFO.logo,
      apple: APP_INFO.logo,
    },
    openGraph: {
      title,
      description,
      siteName: APP_INFO.shortName,
      url: canonicalUrl,
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: APP_INFO.logo,
          width: 800,
          height: 600,
          alt: APP_INFO.shortName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [APP_INFO.logo],
    },
  };
}

export const metadataConfig: Metadata = getLocalizedMetadata("ru");

export function getStructuredData(locale: string = "ru") {
  const isEn = locale === "en";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "MCP COOP",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}${APP_INFO.logo}`,
          caption: "MCP COOP",
        },
        image: `${SITE_URL}${APP_INFO.logo}`,
        description: isEn
          ? "Engineering team for digital solutions: web services, platforms, promotional sites, mobile apps (iOS/Android), and applied AI solutions for business."
          : "Команда инженеров цифровых решений: разработка веб-сервисов, платформ, промо-сайтов, мобильных приложений (iOS/Android) и прикладных AI-решений для бизнеса.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: `${SITE_URL}/contact-us`,
          availableLanguage: ["Russian", "English"],
        },
        sameAs: ["https://t.me/Shpakich_BLR"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "MCP COOP",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: ["ru", "en"],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-web-development`,
        name: "Custom Web Development",
        serviceType: "Web Development",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        description: isEn
          ? "Custom engineering of scalable web services, high-load platforms, SaaS products, corporate portals, and promotional websites with clean architecture."
          : "Разработка масштабируемых веб-сервисов, высоконагруженных платформ, SaaS-решений, корпоративных порталов и промо-сайтов.",
        areaServed: "Global",
        url: `${SITE_URL}/${isEn ? "en" : "ru"}`,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-ai-solutions`,
        name: "AI Solutions & Workflow Automation",
        serviceType: "Artificial Intelligence & Automation",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        description: isEn
          ? "Applied AI solutions and business automation: intelligent assistants, automated business workflows, RAG systems, LLM integrations, and Model Context Protocol (MCP)."
          : "Прикладные AI-решения для бизнеса: интеллектуальные ассистенты, автоматизация бизнес-процессов, RAG-системы и интеграция Model Context Protocol (MCP).",
        areaServed: "Global",
        url: `${SITE_URL}/${isEn ? "en" : "ru"}`,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-mobile-development`,
        name: "Mobile Application Development",
        serviceType: "Mobile App Development",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        description: isEn
          ? "Turnkey native (iOS/SwiftUI) and cross-platform (Flutter) mobile application engineering with seamless API, offline mode, and payment integrations."
          : "Проектирование и разработка под ключ нативных (iOS/SwiftUI) и кроссплатформенных (Flutter) мобильных приложений для iOS и Android.",
        areaServed: "Global",
        url: `${SITE_URL}/${isEn ? "en" : "ru"}`,
      },
    ],
  };
}
