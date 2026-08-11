import Link from "next/link";
import { getAllEvents, getAllCalendarRegulations } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminEventsHub() {
  const events = await getAllEvents();
  const regulations = await getAllCalendarRegulations();
  const georgiaCount = events.filter((e) => e.category === "georgia").length;
  const internationalCount = events.filter((e) => e.category === "international").length;

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">კალენდარი</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/events/georgia" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">საქართველო</h3>
          <p className="text-sm opacity-60">{georgiaCount} ღონისძიება →</p>
        </Link>
        <Link href="/admin/events/international" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">საერთაშორისო</h3>
          <p className="text-sm opacity-60">{internationalCount} ღონისძიება →</p>
        </Link>
        <Link href="/admin/calendar-regulations" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">ფედერაციის დებულებები</h3>
          <p className="text-sm opacity-60">{regulations.length} დოკუმენტი →</p>
        </Link>
      </div>
    </div>
  );
}
