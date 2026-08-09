import { getPartnerById } from "@/lib/queries";
import PartnerForm from "@/components/admin/PartnerForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditPartnerPage({ params }) {
  const partner = await getPartnerById(params.id);
  if (!partner) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">პარტნიორის რედაქტირება</h1>
      <PartnerForm initial={partner} id={params.id} />
    </div>
  );
}
