import type { Metadata } from "next";
import { auth } from "@/core/configs/auth/auth";
import "../globals.css";
import { Providers } from "@/core/providers/providers";
import Header from "@/shared/ui/layout/header";
import Footer from "@/shared/ui/layout/footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "MCP COOP DAO",
  description: "Decentralized infrastructure for AI engineers and product teams. Create cooperatives, find partners, and launch onchain products.",
  keywords: ["DAO", "MCP COOP", "Blockchain", "Cooperative", "AI Engineers", "Web3", "Smart Contracts", "Decentralized", "Crypto"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MCP COOP DAO",
    description: "Decentralized infrastructure for AI engineers and product teams.",
    siteName: "MCP COOP DAO",
    images: [{ url: "/logo.png" }],
    type: "website",
  },
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  const session = await auth();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <Providers session={session}>
            <div className="app min-h-screen flex flex-col">
              <Header session={session} />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
