import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/core/configs/auth";
import "./globals.css";
import { Providers } from "@/core/providers/providers";
import Header from "@/shared/ui/layout/header";
import Footer from "@/shared/ui/layout/footer";

export const metadata: Metadata = {
  title: "MCP COOP Blockchain",
  description: "MCP COOP Blockchain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers session={session}>
          <div className="app min-h-screen flex flex-col">
            <Header session={session} />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
