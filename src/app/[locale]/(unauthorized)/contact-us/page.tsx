import ContactForm from "@/features/contact-form";
import { getPage, DefaultView } from "@/features/page-content";
import type { ListingPageJsonContent } from "@/entities/page-content/types";
import { getTranslations } from "next-intl/server";

export default async function ContactsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const navT = await getTranslations("Navigation");

  const content = await getPage<ListingPageJsonContent>({ pageName: "contact-us", language: locale });

  return (
    <main className="max-w-7xl mx-auto pt-6 pb-12 px-6">
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        <section className="flex-1 min-w-0 w-full flex flex-col gap-10">
          
          <DefaultView 
            content={content} 
            fallbackTitle={navT("contactUs")} 
            fallbackDescription={navT("contactUsDescription")} 
          />

          <ContactForm />

        </section>
      </div>
    </main>
  );
}
