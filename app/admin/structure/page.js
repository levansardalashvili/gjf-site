import Link from "next/link";
import { getAllStructureNodes } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminStructureList() {
  const nodes = await getAllStructureNodes();
  const spine = nodes.filter((n) => n.row_order !== null);
  const branches = nodes.filter((n) => n.row_order === null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">სტრუქტურა</h1>
        <Link href="/admin/structure/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <h2 className="text-sm uppercase tracking-wide opacity-55 mb-3">მთავარი ხაზი</h2>
      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden mb-8">
        {spine.map((n) => (
          <div key={n.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">#{n.row_order}</div>
              <div className="font-semibold truncate">{n.label}{n.person_name && ` — ${n.person_name}`}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/structure/${n.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/structure/${n.id}`} confirmText={`წავშალო "${n.label}"?`} />
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm uppercase tracking-wide opacity-55 mb-3">გვერდითი ყუთები</h2>
      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {branches.map((n) => (
          <div key={n.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">ეკვრის row #{n.attach_to_row}</div>
              <div className="font-semibold truncate">{n.label}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/structure/${n.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/structure/${n.id}`} confirmText={`წავშალო "${n.label}"?`} />
            </div>
          </div>
        ))}
        {branches.length === 0 && <p className="p-6 text-sm opacity-50">გვერდითი ყუთი არ არის.</p>}
      </div>
    </div>
  );
}
