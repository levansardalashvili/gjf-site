import Link from "next/link";
import { getAllTeamMembers, getPageBySlug } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

const LABELS = { standart: "უფროსები", youth: "ახალგაზრდები", kids: "ჭაბუკები", women: "ქალები" };

export default async function AdminTeamMembersList() {
  const members = await getAllTeamMembers();
  const staffPage = await getPageBySlug("national-team-staff");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ნაკრების შემადგენლობა</h1>
        <Link href="/admin/team-members/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      {staffPage && (
        <Link
          href={`/admin/pages/${staffPage.id}`}
          className="flex items-center justify-between gap-4 bg-ink-2 border border-line rounded-2xl px-5 py-4 mb-6 hover:border-gold/50 transition-colors"
        >
          <div>
            <div className="text-xs opacity-50">ცალკე გვერდი</div>
            <div className="font-semibold">მწვრთნელთა შტაბი — ტექსტის რედაქტირება</div>
          </div>
          <span className="text-sm text-gold font-semibold shrink-0">გახსნა →</span>
        </Link>
      )}

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">{LABELS[m.category]} · {m.weight}</div>
              <div className="font-semibold truncate">{m.name}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/team-members/${m.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/team-members/${m.id}`} confirmText={`წავშალო "${m.name}"?`} />
            </div>
          </div>
        ))}
        {members.length === 0 && <p className="p-6 text-sm opacity-50">სპორტსმენი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
