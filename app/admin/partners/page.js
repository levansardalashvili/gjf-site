import Link from "next/link";
import { getAllPartners } from "@/lib/queries";
import PaginatedAdminList from "@/components/admin/PaginatedAdminList";

export const revalidate = 0;

export default async function AdminPartnersList() {
  const partners = await getAllPartners();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">პარტნიორები</h1>
        <Link href="/admin/partners/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>
      <PaginatedAdminList
        items={partners}
        type="logo"
        editPrefix="/admin/partners"
        apiPrefix="/api/partners"
        emptyText="პარტნიორი ჯერ არ არის დამატებული."
      />
    </div>
  );
}
