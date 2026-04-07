import { setRequestLocale } from "next-intl/server";
import { getPage, DefaultView } from "@/features/page-content";
import type { ListingPageJsonContent } from "@/entities/page-content/types";
import { getTranslations } from "next-intl/server";

export default async function BlockchainStatusPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  const navT = await getTranslations("Navigation");
  const content = await getPage<ListingPageJsonContent>({ pageName: "blockchain-status", language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <section className="flex-1 min-w-0 w-full flex flex-col gap-10">
          
          <DefaultView 
            content={content} 
            fallbackTitle={navT("networkStatus")} 
            fallbackDescription={navT("networkStatusDescription")} 
          />

          <div className="w-full py-16 border border-dashed border-default-300 rounded-2xl flex items-center justify-center bg-default-50/50 shadow-sm mt-4">
            <p className="text-xl font-light text-foreground/50 tracking-wider uppercase text-center">
               Network Dashboard (Coming Soon)
            </p>
          </div>
          
        </section>
      </div>
    </main>
  );
}

