import Link from "next/link";
import Image from "next/image";
import { getGalleryAlbumById, getPhotosByAlbum } from "@/lib/queries";
import AlbumPhotoForm from "@/components/admin/AlbumPhotoForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminAlbumPhotosPage({ params }) {
  const album = await getGalleryAlbumById(params.id);
  if (!album) notFound();
  const photos = await getPhotosByAlbum(params.id);

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/gallery" className="hover:text-gold">გალერეა</Link> /{" "}
        <Link href="/admin/gallery/albums" className="hover:text-gold">ალბომები</Link> / {album.title}
      </div>
      <h1 className="font-serif font-bold text-2xl mb-6">{album.title} — ფოტოები</h1>

      <div className="bg-ink-2 border border-line rounded-2xl p-5 mb-6">
        <AlbumPhotoForm albumId={params.id} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((p) => (
          <div key={p.id} className="relative group aspect-square rounded-lg overflow-hidden border border-line">
            <Image src={p.image_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
            <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <DeleteButton endpoint={`/api/gallery/${p.id}`} confirmText="ეს ფოტო მუდმივად წაიშლება." />
            </div>
          </div>
        ))}
      </div>
      {photos.length === 0 && <p className="text-sm opacity-50 mt-4">ფოტო ჯერ არ არის დამატებული ამ ალბომში.</p>}
    </div>
  );
}
