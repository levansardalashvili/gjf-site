import Link from "next/link";
import { getAllNews } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminNewsList() {
  const news = await getAllNews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">სიახლეები</h1>
        <Link href="/admin/news/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {news.map((n) => (
          <div key={n.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">{n.date}</div>
              <div className="font-semibold truncate">{n.title}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/news/${n.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/news/${n.id}`} confirmText={`წავშალო "${n.title}"?`} />
            </div>
          </div>
        ))}
        {news.length === 0 && <p className="p-6 text-sm opacity-50">სიახლე ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
