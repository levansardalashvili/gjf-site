import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarTabs from "@/components/CalendarTabs";
import CalendarRegulations from "@/components/CalendarRegulations";
import { getAllEvents, getAllCalendarRegulations } from "@/lib/queries";

export const revalidate = 60;

export default async function CalendarPage() {
  const events = await getAllEvents();
  const regulations = await getAllCalendarRegulations();
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / კალენდარი</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">ღონისძიებების კალენდარი</h1>
        </div>
        <CalendarTabs events={events} />
        <CalendarRegulations items={regulations} />
        <div className="pb-16" />
      </main>
      <Footer />
    </>
  );
}
