import ContactForm from '@/features/contact-form/ContactForm'
import CoopList from '@/features/coop-list/CoopList'
import CoopItem from '@/features/coop-item/CoopItem'

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-5xl grid-rows-3 flex-1">
      <section className="p-8 flex items-center justify-center bg-content1">
        <ContactForm />
      </section>
      <section className="p-8 flex items-center justify-center bg-content2 border-y border-default-200">
        <CoopList />
      </section>
      <section className="p-8 flex items-center justify-center bg-content1">
        <CoopItem />
      </section>
    </main>
  );
}
