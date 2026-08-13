import Link from "next/link";
import Icon from "@/components/Icon";
import Image from "next/image";
import { getAllGalleryAlbums, getAllGalleryItems } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminAlbumsList() {
  const albums = await getAllGalleryAlbums();
  const allItems = await getAllGalleryItems();

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/gallery" className="hover:text-gold">გალერეა</Link> / ფოტო გალერეა
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ალბომები</h1>
        <Link href="/admin/gallery/albums/new" className="bg-crimson px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors">+ ახალი ალბომი</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((a) => {
          const count = allItems.filter((i) => i.album_id === a.id && i.type === "photo").length;
          return (
            <div key={a.id} className="bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 transition-colors">
              <Link href={`/admin/gallery/albums/${a.id}/photos`} className="block relative aspect-[4/3] bg-ink">
                {a.cover_image_url && <Image src={a.cover_image_url} alt={a.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />}
              </Link>
              <div className="p-4">
                <Link href={`/admin/gallery/albums/${a.id}/photos`} className="font-semibold text-sm block truncate hover:text-gold transition-colors">
                  {a.title}
                </Link>
                <div className="text-xs opacity-50 mt-1">{count} ფოტო</div>
                <div className="flex items-center gap-4 mt-3">
                  <Link href={`/admin/gallery/albums/${a.id}/photos`} className="text-xs text-gold font-semibold">ფოტოების მართვა</Link>
                  <Link href={`/admin/gallery/albums/edit/${a.id}`} className="text-xs opacity-60 hover:opacity-100">დეტალები</Link>
                  <DeleteButton endpoint={`/api/gallery-albums/${a.id}`} confirmText={`"${a.title}" და მასში არსებული ყველა ფოტო მუდმივად წაიშლება.`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {albums.length === 0 && (
        <div className="p-10 text-center bg-ink-2 border border-line rounded-2xl">
          <div className="flex justify-center mb-2 opacity-40"><Icon name="gallery" size={30} /></div>
          <p className="text-sm opacity-50">ალბომი ჯერ არ არის დამატებული.</p>
        </div>
      )}
    </div>
  );
}
