import Link from "next/link";
import Image from "next/image";
import { getAllCommissionsMembers } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminCommissionsList() {
  const members = await getAllCommissionsMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">კომისიები</h1>
        <Link href="/admin/commissions/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-4 px-5 py-4 border-b border-line last:border-0">
            {m.photo_url ? (
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                <Image src={m.photo_url} alt={m.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center shrink-0">
                {m.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs opacity-50">თანმიმდევრობა: {m.sort_order}</div>
              <div className="font-semibold truncate">{m.name}</div>
              <div className="text-sm opacity-60 truncate">{m.role}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/commissions/${m.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/commissions/${m.id}`} confirmText={`წავშალო "${m.name}"?`} />
            </div>
          </div>
        ))}
        {members.length === 0 && <p className="p-6 text-sm opacity-50">წევრი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
