import { setRequestLocale } from "next-intl/server";
import { PAGE_KEYS } from "@/shared/constants/page-keys";
import { getPageContent } from "@/features/page-content/actions/page-content.actions";
import { getTranslations } from "next-intl/server";

export default async function BlockchainStatusPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  const navT = await getTranslations("Navigation");
  const content = await getPageContent({ page: PAGE_KEYS.blockchainStatus, language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <section className="flex-1 min-w-0 w-full flex flex-col gap-10">
          
          <div className="flex flex-col gap-3 w-full pb-2">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-foreground antialiased">
              {content?.title || navT("networkStatus")}
            </h1>
            {content?.subtitle && (
              <p className="text-[15px] sm:text-base font-medium text-foreground leading-snug">
                {content.subtitle}
              </p>
            )}
            <p className="w-full text-sm sm:text-[15px] leading-relaxed text-foreground whitespace-pre-wrap mt-1">
              {content?.description || navT("networkStatusDescription")}
            </p>
          </div>

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

