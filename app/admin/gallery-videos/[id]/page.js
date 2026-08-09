import { getGalleryVideoById } from "@/lib/queries";
import GalleryVideoForm from "@/components/admin/GalleryVideoForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditGalleryVideoPage({ params }) {
  const video = await getGalleryVideoById(params.id);
  if (!video) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ვიდეოს რედაქტირება</h1>
      <GalleryVideoForm initial={video} id={params.id} />
    </div>
  );
}
