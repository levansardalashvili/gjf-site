import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarPaginated from "@/components/CalendarPaginated";
import { getEventsByCategory } from "@/lib/queries";
import Trans from "@/components/Trans";

export const revalidate = 60;

export default async function CalendarInternationalPage() {
  const events = await getEventsByCategory("international");
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5"><a href="/calendar" className="hover:text-gold"><Trans k="calendar" /></a> / <Trans k="international" /></div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="calendarInternational" /></h1>
        </div>
        <div className="pb-16">
          <CalendarPaginated events={events} />
        </div>
      </main>
      <Footer />
    </>
  );
}
