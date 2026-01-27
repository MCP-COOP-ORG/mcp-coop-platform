import ContactForm from "@/features/contact-form";
import PageContentLayout from "@/components/layout/page-content";

export default function ContactsPage() {
  return (
    <>
      <PageContentLayout pageKey="contact-us" language="en" />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <ContactForm />
      </div>
    </>
  );
}
