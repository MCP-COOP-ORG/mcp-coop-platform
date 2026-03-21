import ContactForm from "@/features/contact-form";
import PageContentLayout from "@/shared/ui/layout/page-content";
import { PAGE_KEYS } from "@/shared/constants/page-keys";

export default async function ContactsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return (
    <>
      <PageContentLayout pageKey={PAGE_KEYS.contactUs} language={locale} />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <ContactForm />
      </div>
    </>
  );
}
