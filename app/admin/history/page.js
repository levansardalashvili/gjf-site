import Link from "next/link";
import { getAllPages } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminHistoryPage() {
  const allPages = await getAllPages();
  const pages = allPages.filter((p) => p.slug.startsWith("judo-"));

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ისტორია</h1>

      <Link
        href="/admin/medal-records"
        className="block bg-ink-2 border border-line rounded-2xl p-5 mb-6 hover:border-gold/50 transition-colors"
      >
        <h3 className="font-serif font-bold text-lg mb-1">მედლების სტატისტიკა</h3>
        <p className="text-sm opacity-60">ოლიმპიადა/მსოფლიო/ევროპის ჩემპიონატების მედლების ცხრილი — /judo/statistic</p>
      </Link>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {pages.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50 font-mono">{p.slug}</div>
              <div className="font-semibold truncate">{p.title}</div>
            </div>
            <Link href={`/admin/pages/${p.id}`} className="text-sm text-gold font-semibold shrink-0">რედაქტირება</Link>
          </div>
        ))}
        {pages.length === 0 && <p className="p-6 text-sm opacity-50">ჩანაწერი არ არის.</p>}
      </div>
    </div>
  );
}
