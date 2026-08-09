import Link from "next/link";
import { getAllPages } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminPagesList() {
  const pages = await getAllPages();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">გვერდების კონტენტი</h1>
      <p className="text-sm opacity-55 mb-6">ფედერაციისა და ისტორიის სექციების ტექსტები.</p>

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
      </div>
    </div>
  );
}
