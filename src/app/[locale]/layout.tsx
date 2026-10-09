import type { Metadata } from "next";
import { ibmPlexSans, ibmPlexMono } from "@/core/configs/theme/fonts.config";
import {
  getLocalizedMetadata,
  getStructuredData,
  viewportConfig,
} from "@/core/configs/seo/seo.config";
import "../globals.css";
import { Providers } from "@/core/providers/providers";
import { Header } from "@/features/header";
import Footer from "@/shared/ui/layout/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { myProfileControllerFindMe } from "@/shared/open-api/profiles/profiles";
import { mapMeResponseDto } from "@/shared/mappers";
import type { MyProfileData } from "@/entities/profiles/types";
import type { AppSession } from "@/shared/types/auth";

export const viewport = viewportConfig;

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return getLocalizedMetadata(locale);
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { children } = props;

  const [profileResponse, messages] = await Promise.all([
    myProfileControllerFindMe().catch(() => null),
    getMessages(),
  ]);

  const myProfile: MyProfileData | null =
    profileResponse?.data ? mapMeResponseDto(profileResponse.data) : null;

  const session: AppSession = { myProfile };
  const jsonLd = getStructuredData(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`scroll-smooth ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <Providers session={session}>
            <div className="app min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
