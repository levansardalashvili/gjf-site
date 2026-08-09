import { getPageById } from "@/lib/queries";
import PageForm from "@/components/admin/PageForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditPagePage({ params }) {
  const page = await getPageById(params.id);
  if (!page) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-1">{page.title}</h1>
      <p className="text-sm opacity-50 font-mono mb-6">{page.slug}</p>
      <PageForm initial={page} id={params.id} />
    </div>
  );
}
