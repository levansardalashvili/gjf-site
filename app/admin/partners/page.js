import Link from "next/link";
import Image from "next/image";
import { getAllPartners } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminPartnersList() {
  const partners = await getAllPartners();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">პარტნიორები</h1>
        <Link href="/admin/partners/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {partners.map((p) => (
          <div key={p.id} className="flex items-center gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="relative w-16 h-12 bg-white rounded-md overflow-hidden shrink-0">
              <Image src={p.logo_url} alt={p.name} fill className="object-contain p-1.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs opacity-50">თანმიმდევრობა: {p.sort_order}</div>
              <div className="font-semibold truncate">{p.name}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/partners/${p.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/partners/${p.id}`} confirmText={`წავშალო "${p.name}"?`} />
            </div>
          </div>
        ))}
        {partners.length === 0 && <p className="p-6 text-sm opacity-50">პარტნიორი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
