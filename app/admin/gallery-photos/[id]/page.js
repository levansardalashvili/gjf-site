import { getGalleryPhotoById } from "@/lib/queries";
import GalleryPhotoForm from "@/components/admin/GalleryPhotoForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditGalleryPhotoPage({ params }) {
  const photo = await getGalleryPhotoById(params.id);
  if (!photo) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ფოტოს რედაქტირება</h1>
      <GalleryPhotoForm initial={photo} id={params.id} />
    </div>
  );
}
