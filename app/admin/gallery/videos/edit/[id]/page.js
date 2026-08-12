import { getGalleryItemById } from "@/lib/queries";
import VideoForm from "@/components/admin/VideoForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditVideoPage({ params }) {
  const video = await getGalleryItemById(params.id);
  if (!video) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ვიდეოს რედაქტირება</h1>
      <VideoForm initial={video} id={params.id} />
    </div>
  );
}
