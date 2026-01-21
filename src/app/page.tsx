import ContactForm from '@/features/contact-form/ContactForm'
import CoopList from '@/features/coop-list/CoopList'
import CoopItem from '@/features/coop-item/CoopItem'

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        <ContactForm />
        <CoopList />
        <CoopItem />
      </div>
    </main>
  );
}
