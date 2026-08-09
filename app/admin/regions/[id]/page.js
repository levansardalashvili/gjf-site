import { getRegionById } from "@/lib/queries";
import RegionForm from "@/components/admin/RegionForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditRegionPage({ params }) {
  const region = await getRegionById(params.id);
  if (!region) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">რეგიონის რედაქტირება</h1>
      <RegionForm initial={region} id={params.id} />
    </div>
  );
}
