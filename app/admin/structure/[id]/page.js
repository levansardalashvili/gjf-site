import { getStructureNodeById } from "@/lib/queries";
import StructureNodeForm from "@/components/admin/StructureNodeForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditStructureNodePage({ params }) {
  const node = await getStructureNodeById(params.id);
  if (!node) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ელემენტის რედაქტირება</h1>
      <StructureNodeForm initial={node} id={params.id} />
    </div>
  );
}
