import { getPage, DefaultView } from "@/features/page-content";
import type { ListingPageJsonContent } from "@/entities/page-content/types";
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
  const content = await getPage<ListingPageJsonContent>({ pageName: "coops", language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <section className="flex-1 min-w-0 w-full flex flex-col gap-10">

          {/* Page Header */}
          <DefaultView 
            content={content} 
            fallbackTitle={navT("coops")} 
            fallbackDescription={navT("coopsDescription")} 
          />

          <Suspense fallback={<div className="w-full flex justify-center py-10"><Spinner size="lg" color="primary" /></div>}>
            <CoopsCatalog page={page} />
          </Suspense>

        </section>
      </div>
    </main>
  );
}
