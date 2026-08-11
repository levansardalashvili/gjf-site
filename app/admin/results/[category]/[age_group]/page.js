import Link from "next/link";
import { getAllResults } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";
import { notFound } from "next/navigation";

export const revalidate = 0;

const CAT_LABEL = { georgia: "საქართველო", international: "საერთაშორისო" };
const GROUP_LABEL = { standart: "უფროსები", youth: "ახალგაზრდები", kids: "ჭაბუკები", women: "ქალები" };

export default async function AdminResultsListPage({ params }) {
  const catLabel = CAT_LABEL[params.category];
  const groupLabel = GROUP_LABEL[params.age_group];
  if (!catLabel || !groupLabel) notFound();

  const allResults = await getAllResults();
  const results = allResults.filter(
    (r) => r.category === params.category && r.age_group === params.age_group
  );

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/results" className="hover:text-gold">შედეგები</Link> /{" "}
        <Link href={`/admin/results/${params.category}`} className="hover:text-gold">{catLabel}</Link> / {groupLabel}
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">{catLabel} — {groupLabel}</h1>
        <Link
          href={`/admin/results/new?category=${params.category}&age_group=${params.age_group}`}
          className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold"
        >
          + ახალი
        </Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {results.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">{r.event_date}</div>
              <div className="font-semibold truncate">{r.event_name}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/results/edit/${r.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/results/${r.id}`} confirmText={`წავშალო "${r.event_name}"?`} />
            </div>
          </div>
        ))}
        {results.length === 0 && <p className="p-6 text-sm opacity-50">შედეგი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
