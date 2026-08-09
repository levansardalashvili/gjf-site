import { getResultById } from "@/lib/queries";
import ResultForm from "@/components/admin/ResultForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditResultPage({ params }) {
  const result = await getResultById(params.id);
  if (!result) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">შედეგის რედაქტირება</h1>
      <ResultForm initial={result} id={params.id} />
    </div>
  );
}
