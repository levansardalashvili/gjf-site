import Link from "next/link";
import { getAllTeamMembers, getPageBySlug } from "@/lib/queries";

export const revalidate = 0;

const CATEGORIES = [
  { key: "standart", label: "უფროსები" },
  { key: "youth", label: "ახალგაზრდები" },
  { key: "kids", label: "ჭაბუკები" },
  { key: "women", label: "ქალები" },
];

export default async function AdminTeamMembersHub() {
  const members = await getAllTeamMembers();
  const staffPage = await getPageBySlug("national-team-staff");

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ნაკრების შემადგენლობა</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => {
          const count = members.filter((m) => m.category === c.key).length;
          return (
            <Link
              key={c.key}
              href={`/admin/team-members/${c.key}`}
              className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-serif font-bold text-lg mb-1">{c.label}</h3>
              <p className="text-sm opacity-60">{count} სპორტსმენი →</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
