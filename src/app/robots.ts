import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/workspace", "/workspace/*", "/api", "/api/*"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/workspace", "/workspace/*", "/api", "/api/*"],
      },
    ],
    sitemap: "https://mcpcoop.org/sitemap.xml",
  };
}
