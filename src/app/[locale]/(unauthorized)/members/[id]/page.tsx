import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui/components/hero-ui";
import { ProfileDetail } from "@/features/profiles/ui/profile-detail";

export default async function MemberDetailsPage(props: { params: Promise<{ locale: string; id: string }> }) {
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
        <ProfileDetail id={id} />
      </Suspense>
    </main>
  );
}
