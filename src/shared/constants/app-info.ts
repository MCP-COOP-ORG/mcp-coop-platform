/**
 * Single source of truth for application identity.
 * shortName — used in header logo, compact UI elements.
 * fullName — used in SEO metadata, Open Graph, footer copyright.
 */
export const APP_INFO = {
  shortName: "MCP COOP",
  fullName: "MCP COOP DAO",
  copyright: "© 2025 MCP COOP DAO",
  logo: "/logo.png",
  description:
    "Decentralized infrastructure for AI engineers and product teams. Create cooperatives, find partners, and launch onchain products.",
} as const;
