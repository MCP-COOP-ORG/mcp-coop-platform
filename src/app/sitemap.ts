import type { MetadataRoute } from "next";

const BASE_URL = "https://mcpcoop.org";
const LOCALES = ["ru", "en"] as const;

interface RouteDefinition {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const ROUTES: RouteDefinition[] = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/contact-us", changeFrequency: "weekly", priority: 0.8 },
  { path: "/members", changeFrequency: "weekly", priority: 0.8 },
  { path: "/coops", changeFrequency: "weekly", priority: 0.8 },
  { path: "/docs", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            ru: `${BASE_URL}/ru${route.path}`,
            en: `${BASE_URL}/en${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
