import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui/primitives";
import { CoopDetail } from "@/features/coops/ui/coop-detail";

export default async function CoopDetailsPage(props: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-20">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <CoopDetail id={id} />
      </Suspense>
    </main>
  );
}
