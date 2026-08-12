import Link from "next/link";
import { getAllCalendarRegulations } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminCalendarRegulationsList() {
  const items = await getAllCalendarRegulations();

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/events" className="hover:text-gold">კალენდარი</Link> / ფედერაციის დებულებები
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ფედერაციის დებულებები</h1>
        <Link href="/admin/calendar-regulations/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {items.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">თანმიმდევრობა: {r.sort_order} {r.force_download && "· ავტო-ჩამოტვირთვა"}</div>
              <div className="font-semibold truncate">{r.title}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/calendar-regulations/edit/${r.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/calendar-regulations/${r.id}`} confirmText={`წავშალო "${r.title}"?`} />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="p-6 text-sm opacity-50">დებულება ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
