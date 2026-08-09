import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventRow from "@/components/EventRow";
import { getEventsByCategory } from "@/lib/queries";

export const revalidate = 60;

export default async function CalendarInternationalPage() {
  const events = await getEventsByCategory("international");
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5"><a href="/calendar" className="hover:text-gold">კალენდარი</a> / საერთაშორისო</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">კალენდარი — საერთაშორისო</h1>
        </div>
        <div className="border-t border-line pb-16">
          {events.length ? events.map((e) => <EventRow key={e.slug} {...e} />) : (
            <p className="opacity-50 py-8 text-sm">ამჟამად დაგეგმილი ღონისძიება არ არის.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
