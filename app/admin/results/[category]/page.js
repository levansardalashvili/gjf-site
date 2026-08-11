import Link from "next/link";
import { getAllResults } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

const CAT_LABEL = { georgia: "საქართველო", international: "საერთაშორისო" };
const GROUPS = [
  { key: "standart", label: "უფროსები" },
  { key: "youth", label: "ახალგაზრდები" },
  { key: "kids", label: "ჭაბუკები" },
  { key: "women", label: "ქალები" },
];

export default async function AdminResultsCategoryPage({ params }) {
  const catLabel = CAT_LABEL[params.category];
  if (!catLabel) notFound();

  const results = await getAllResults();
  const inCategory = results.filter((r) => r.category === params.category);

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/results" className="hover:text-gold">შედეგები</Link> / {catLabel}
      </div>
      <h1 className="font-serif font-bold text-2xl mb-6">{catLabel}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GROUPS.map((g) => {
          const count = inCategory.filter((r) => r.age_group === g.key).length;
          return (
            <Link
              key={g.key}
              href={`/admin/results/${params.category}/${g.key}`}
              className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-serif font-bold text-lg mb-1">{g.label}</h3>
              <p className="text-sm opacity-60">{count} შედეგი →</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
