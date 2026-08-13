import Link from "next/link";
import Image from "next/image";
import { getAllPortalLinks } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminPortalLinksList() {
  const links = await getAllPortalLinks();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif font-bold text-2xl">Portal ბლოკი</h1>
        <Link href="/admin/portal-links/new" className="bg-crimson px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors">+ ახალი</Link>
      </div>
      <p className="text-sm opacity-55 mb-6">მთავარ გვერდზე, კალენდრის ქვემოთ ჩანს (Portal Judomanager, Admin Judomanager და მისთ.)</p>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {links.map((l) => (
          <div key={l.id} className="flex items-center gap-4 px-5 py-4 border-b border-line last:border-0">
            {l.logo_url && (
              <div className="w-14 h-11 rounded-md bg-white flex items-center justify-center p-1.5 shrink-0">
                <div className="relative w-full h-full">
                  <Image src={l.logo_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain" />
                </div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs opacity-50">თანმიმდევრობა: {l.sort_order}</div>
              <div className="font-semibold truncate">{l.title}</div>
              <div className="text-sm opacity-60 truncate">{l.description}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/portal-links/edit/${l.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/portal-links/${l.id}`} confirmText={`წავშალო "${l.title}"?`} />
            </div>
          </div>
        ))}
        {links.length === 0 && <p className="p-6 text-sm opacity-50">ჩანაწერი არ არის.</p>}
      </div>
    </div>
  );
}
