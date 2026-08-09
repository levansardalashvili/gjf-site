import { getNewsById } from "@/lib/queries";
import NewsForm from "@/components/admin/NewsForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditNewsPage({ params }) {
  const item = await getNewsById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">სიახლის რედაქტირება</h1>
      <NewsForm initial={item} id={params.id} />
    </div>
  );
}
