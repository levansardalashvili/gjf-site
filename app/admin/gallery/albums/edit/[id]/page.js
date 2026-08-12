import { getGalleryAlbumById } from "@/lib/queries";
import AlbumForm from "@/components/admin/AlbumForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditAlbumPage({ params }) {
  const album = await getGalleryAlbumById(params.id);
  if (!album) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ალბომის დეტალები</h1>
      <AlbumForm initial={album} id={params.id} />
    </div>
  );
}
