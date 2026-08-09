import { getCommissionsMemberById } from "@/lib/queries";
import CommissionsForm from "@/components/admin/CommissionsForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditCommissionsMemberPage({ params }) {
  const member = await getCommissionsMemberById(params.id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">წევრის რედაქტირება</h1>
      <CommissionsForm initial={member} id={params.id} />
    </div>
  );
}
