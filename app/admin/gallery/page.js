import Link from "next/link";
import { getAllGalleryAlbums, getGalleryByType } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminGalleryHub() {
  const albums = await getAllGalleryAlbums();
  const videos = await getGalleryByType("video");

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">გალერეა</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/gallery/albums" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">ფოტო გალერეა</h3>
          <p className="text-sm opacity-60">{albums.length} ალბომი →</p>
        </Link>
        <Link href="/admin/gallery/videos" className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif font-bold text-lg mb-1">ვიდეო გალერეა</h3>
          <p className="text-sm opacity-60">{videos.length} ვიდეო →</p>
        </Link>
      </div>
    </div>
  );
}
