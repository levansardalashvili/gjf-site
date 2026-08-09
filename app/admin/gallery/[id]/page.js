import { getGalleryItemById } from "@/lib/queries";
import GalleryForm from "@/components/admin/GalleryForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditGalleryItemPage({ params }) {
  const item = await getGalleryItemById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">გალერეის ჩანაწერის რედაქტირება</h1>
      <GalleryForm initial={item} id={params.id} />
    </div>
  );
}
