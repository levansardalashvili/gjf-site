import Link from "next/link";
import { getAllResults } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminResultsHub() {
  const results = await getAllResults();
  const georgiaCount = results.filter((r) => r.category === "georgia").length;
  const internationalCount = results.filter((r) => r.category === "international").length;

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">შედეგები</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/results/georgia" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">საქართველო</h3>
          <p className="text-sm opacity-60">{georgiaCount} შედეგი →</p>
        </Link>
        <Link href="/admin/results/international" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">საერთაშორისო</h3>
          <p className="text-sm opacity-60">{internationalCount} შედეგი →</p>
        </Link>
      </div>
    </div>
  );
}
