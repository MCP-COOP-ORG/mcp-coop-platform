import { PAGE_KEYS } from "@/shared/constants/page-keys";
import { getPageContent } from "@/features/page-content/actions/page-content.actions";
import { getTranslations } from "next-intl/server";
import { CoopsCatalog } from "@/features/coops/ui/coops-catalog";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui/primitives";

export default async function CoopsPage(props: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const navT = await getTranslations("Navigation");

  // Fetch dynamic content overriding translation labels if exists
  const content = await getPageContent({ page: PAGE_KEYS.coops, language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <section className="flex-1 min-w-0 w-full flex flex-col gap-10">

          {/* Page Header matching Docs structure */}
          <div className="flex flex-col gap-3 w-full pb-2">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-foreground antialiased">
              {content?.title || navT("coops")}
            </h1>
            {content?.subtitle && (
              <p className="text-[15px] sm:text-base font-medium text-foreground leading-snug">
                {content.subtitle}
              </p>
            )}
            <p className="w-full text-sm sm:text-[15px] leading-relaxed text-foreground whitespace-pre-wrap mt-1">
              {content?.description || navT("coopsDescription")}
            </p>
          </div>

          <Suspense fallback={<div className="w-full flex justify-center py-10"><Spinner size="lg" color="primary" /></div>}>
            <CoopsCatalog page={page} />
          </Suspense>

        </section>
      </div>
    </main>
  );
}
