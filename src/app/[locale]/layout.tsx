import type { Metadata } from "next";
import { auth } from "@/core/configs/auth/auth";
import "../globals.css";
import { Providers } from "@/core/providers/providers";
import Header from "@/shared/ui/layout/header";
import Footer from "@/shared/ui/layout/footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "MCP COOP Blockchain",
  description: "MCP COOP Blockchain",
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
