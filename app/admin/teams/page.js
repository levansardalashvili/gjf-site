import Link from "next/link";
import { getPageBySlug } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminTeamsHub() {
  const staffPage = await getPageBySlug("national-team-staff");

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ნაკრები</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {staffPage && (
          <Link href={`/admin/pages/${staffPage.id}`} className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
            <h3 className="font-serif font-bold text-lg mb-1">მწვრთნელთა შტაბი</h3>
            <p className="text-sm opacity-60">ტექსტის რედაქტირება →</p>
          </Link>
        )}
        <Link href="/admin/team-members" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 transition-colors">
          <h3 className="font-serif font-bold text-lg mb-1">ნაკრების შემადგენლობა</h3>
          <p className="text-sm opacity-60">უფროსები, ახალგაზრდები, ჭაბუკები, ქალები — დამატება, რედაქტირება, წაშლა →</p>
        </Link>
      </div>
    </div>
  );
}
