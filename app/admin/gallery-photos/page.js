import Link from "next/link";
import Image from "next/image";
import { getAllGalleryPhotos } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminGalleryPhotosList() {
  const photos = await getAllGalleryPhotos();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ფოტო გალერეა</h1>
        <Link href="/admin/gallery-photos/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="bg-ink-2 border border-line rounded-xl overflow-hidden">
            <div className="relative aspect-square">
              <Image src={p.image_url} alt={p.caption || ""} fill className="object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <Link href={`/admin/gallery-photos/${p.id}`} className="text-xs text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/gallery-photos/${p.id}`} confirmText="წავშალო ეს ფოტო?" />
            </div>
          </div>
        ))}
      </div>
      {photos.length === 0 && <p className="text-sm opacity-50">ფოტო ჯერ არ არის დამატებული.</p>}
    </div>
  );
}
