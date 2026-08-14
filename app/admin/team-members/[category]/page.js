import Link from "next/link";
import Image from "next/image";
import { getAllTeamMembers } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";
import { notFound } from "next/navigation";

export const revalidate = 0;

const LABELS = { standart: "უფროსები", youth: "ახალგაზრდები", kids: "ჭაბუკები", women: "ქალები" };

export default async function AdminTeamMembersCategoryPage({ params }) {
  const label = LABELS[params.category];
  if (!label) notFound();

  const allMembers = await getAllTeamMembers();
  const members = allMembers.filter((m) => m.category === params.category);

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/team-members" className="hover:text-gold">ნაკრები</Link> / {label}
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">{label}</h1>
        <Link href={`/admin/team-members/new?category=${params.category}`} className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-4 px-5 py-4 border-b border-line last:border-0">
            {m.photo_url ? (
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                <Image src={m.photo_url} alt={m.name} fill sizes="44px" className="object-cover" />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-gold/15 text-gold font-bold flex items-center justify-center shrink-0">
                {m.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs opacity-50">{m.weight}{m.club && ` · ${m.club}`}</div>
              <div className="font-semibold truncate">{m.name}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/team-members/edit/${m.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/team-members/${m.id}`} confirmText={`წავშალო "${m.name}"?`} />
            </div>
          </div>
        ))}
        {members.length === 0 && <p className="p-6 text-sm opacity-50">სპორტსმენი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
