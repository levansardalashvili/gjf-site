import { getCommitteeMemberById } from "@/lib/queries";
import CommitteeForm from "@/components/admin/CommitteeForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditCommitteeMemberPage({ params }) {
  const member = await getCommitteeMemberById(params.id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">წევრის რედაქტირება</h1>
      <CommitteeForm initial={member} id={params.id} />
    </div>
  );
}
