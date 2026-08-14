import Link from "next/link";
import { getAllMedalRecords } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

function summarize(record) {
  const parts = [];
  ["olympic_gold", "world_gold", "european_gold"].forEach((k) => {
    if (record[k]) parts.push(record[k]);
  });
  return parts.join(" · ") || "—";
}

export default async function AdminMedalRecordsList() {
  const records = await getAllMedalRecords();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif font-bold text-2xl">მედლების სტატისტიკა</h1>
        <Link href="/admin/medal-records/new" className="bg-crimson px-4 py-2.5 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>
      <p className="text-sm opacity-55 mb-6">/judo/statistic გვერდზე ჩანს — ცხრილის ფორმატში.</p>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {records.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="font-semibold truncate">{r.athlete_name}</div>
              <div className="text-xs opacity-50">ოქრო: {summarize(r)}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/medal-records/edit/${r.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/medal-records/${r.id}`} confirmText={`წავშალო "${r.athlete_name}"?`} />
            </div>
          </div>
        ))}
        {records.length === 0 && <p className="p-6 text-sm opacity-50">ჩანაწერი არ არის.</p>}
      </div>
    </div>
  );
}
