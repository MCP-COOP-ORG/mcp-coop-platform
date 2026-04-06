import { setRequestLocale } from "next-intl/server";
import { PAGE_KEYS } from "@/shared/constants/page-keys";
import { getPageContent } from "@/features/page-content/actions/page-content.actions";
import { getTranslations } from "next-intl/server";
import { ProfilesCatalog } from "@/features/profiles/ui/profiles-catalog";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui/primitives";

export default async function MembersPage(props: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  setRequestLocale(locale);

  const navT = await getTranslations("Navigation");
  const content = await getPageContent({ page: PAGE_KEYS.members, language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <section className="flex-1 min-w-0 w-full flex flex-col gap-10">

          {/* Page Header */}
          <div className="flex flex-col gap-3 w-full pb-2">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-foreground antialiased">
              {content?.title || navT("members")}
            </h1>
            {content?.subtitle && (
              <p className="text-[15px] sm:text-base font-medium text-foreground leading-snug">
                {content.subtitle}
              </p>
            )}
            <p className="w-full text-sm sm:text-[15px] leading-relaxed text-foreground whitespace-pre-wrap mt-1">
              {content?.description || navT("membersDescription")}
            </p>
          </div>

          <Suspense fallback={<div className="w-full flex justify-center py-10"><Spinner size="lg" color="primary" /></div>}>
            <ProfilesCatalog page={page} />
          </Suspense>

        </section>
      </div>
    </main>
  );
}
