import { getRegulationById } from "@/lib/queries";
import RegulationForm from "@/components/admin/RegulationForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditRegulationPage({ params }) {
  const regulation = await getRegulationById(params.id);
  if (!regulation) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">დებულების რედაქტირება</h1>
      <RegulationForm initial={regulation} id={params.id} />
    </div>
  );
}
