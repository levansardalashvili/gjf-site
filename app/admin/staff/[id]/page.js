import { getStaffMemberById } from "@/lib/queries";
import StaffForm from "@/components/admin/StaffForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditStaffPage({ params }) {
  const member = await getStaffMemberById(params.id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">წევრის რედაქტირება</h1>
      <StaffForm initial={member} id={params.id} />
    </div>
  );
}
