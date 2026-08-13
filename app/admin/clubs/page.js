import Link from "next/link";
import { getAllClubs } from "@/lib/queries";
import PaginatedAdminList from "@/components/admin/PaginatedAdminList";

export const revalidate = 0;

export default async function AdminClubsList() {
  const clubs = await getAllClubs();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">კლუბები</h1>
        <Link href="/admin/clubs/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>
      <PaginatedAdminList
        items={clubs}
        type="simple"
        editPrefix="/admin/clubs"
        apiPrefix="/api/clubs"
        emptyText="კლუბი ჯერ არ არის დამატებული."
      />
    </div>
  );
}
