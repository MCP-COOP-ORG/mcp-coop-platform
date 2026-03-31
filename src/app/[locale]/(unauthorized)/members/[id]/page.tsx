import { setRequestLocale } from "next-intl/server";

export default async function MemberDetailsPage(props: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col gap-4 items-center justify-center min-h-[40vh] py-16 border border-dashed border-default-300 rounded-2xl bg-default-50/50 shadow-sm mt-4">
        <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-foreground antialiased text-center">
          Specialist Profile
        </h1>
        <p className="text-[15px] sm:text-base font-medium text-foreground/60 leading-snug break-all px-4 text-center">
          Profile ID: {id}
        </p>
        <p className="text-xl font-light text-foreground/50 tracking-wider uppercase mt-6">
          Coming Soon
        </p>
      </div>
    </main>
  );
}
