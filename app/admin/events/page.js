import Link from "next/link";
import { getAllEvents } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminEventsList() {
  const events = await getAllEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ღონისძიებები</h1>
        <Link href="/admin/events/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {events.map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">{e.date_range} · {e.category === "georgia" ? "საქართველო" : "საერთაშორისო"}</div>
              <div className="font-semibold truncate">{e.title}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/events/${e.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/events/${e.id}`} confirmText={`წავშალო "${e.title}"?`} />
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="p-6 text-sm opacity-50">ღონისძიება ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
