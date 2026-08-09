import Link from "next/link";
import { getAllPages } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminFederationPage() {
  const allPages = await getAllPages();
  const pages = allPages.filter((p) => p.slug.startsWith("federation-"));

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">ფედერაცია</h1>
      <p className="text-sm opacity-55 mb-6">
        ფედერაციის ქვე-გვერდების ტექსტი. კლუბები და პროექტები ცალკე იმართება (ბმულები ქვემოთ).
      </p>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-4">
        <Link href="/admin/staff" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">შემადგენლობა</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
        <Link href="/admin/committee" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">აღმასკომი</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
        <Link href="/admin/regulations" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">დებულებები</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
        <Link href="/admin/commissions" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">კომისიები</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
        <Link href="/admin/regions" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">რეგიონები</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
        <Link href="/admin/clubs" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">კლუბები</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
        <Link href="/admin/projects" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">პროექტები</h3>
          <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
        </Link>
      </div>
    </div>
  );
}
