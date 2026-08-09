import Link from "next/link";
import { getAllResults } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

const CAT_LABEL = { georgia: "საქართველო", international: "საერთაშორისო" };
const GROUP_LABEL = { standart: "უფროსები", youth: "ახალგაზრდები", kids: "ჭაბუკები" };

export default async function AdminResultsList() {
  const results = await getAllResults();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">შედეგები</h1>
        <Link href="/admin/results/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {results.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">
                {CAT_LABEL[r.category]} · {GROUP_LABEL[r.age_group]} · {r.event_name}
              </div>
              <div className="font-semibold truncate">
                {r.event_name}
                {r.athlete && r.athlete !== "—" && ` — ${r.athlete}`}
                {r.medal && ` (${r.medal})`}
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/results/${r.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/results/${r.id}`} confirmText={`წავშალო "${r.athlete}"-ს შედეგი?`} />
            </div>
          </div>
        ))}
        {results.length === 0 && <p className="p-6 text-sm opacity-50">შედეგი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
