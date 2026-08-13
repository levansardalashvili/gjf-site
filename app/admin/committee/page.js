import Link from "next/link";
import { getAllCommitteeMembers } from "@/lib/queries";
import PaginatedAdminList from "@/components/admin/PaginatedAdminList";

export const revalidate = 0;

export default async function AdminCommitteeList() {
  const members = await getAllCommitteeMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">აღმასკომი</h1>
        <Link href="/admin/committee/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>
      <PaginatedAdminList
        items={members}
        type="avatar"
        editPrefix="/admin/committee"
        apiPrefix="/api/committee"
        emptyText="წევრი ჯერ არ არის დამატებული."
      />
    </div>
  );
}
