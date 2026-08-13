import Link from "next/link";
import { getAllStaffMembers } from "@/lib/queries";
import PaginatedAdminList from "@/components/admin/PaginatedAdminList";

export const revalidate = 0;

export default async function AdminStaffList() {
  const staff = await getAllStaffMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ფედერაციის შემადგენლობა</h1>
        <Link href="/admin/staff/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>
      <PaginatedAdminList
        items={staff}
        type="avatar"
        editPrefix="/admin/staff"
        apiPrefix="/api/staff"
        emptyText="წევრი ჯერ არ არის დამატებული."
      />
    </div>
  );
}
