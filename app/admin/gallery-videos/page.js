import Link from "next/link";
import { getAllGalleryVideos } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminGalleryVideosList() {
  const videos = await getAllGalleryVideos();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ვიდეო გალერეა</h1>
        <Link href="/admin/gallery-videos/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {videos.map((v) => (
          <div key={v.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="font-semibold truncate">{v.title}</div>
              <div className="text-xs opacity-50 truncate">{v.youtube_url}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/gallery-videos/${v.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/gallery-videos/${v.id}`} confirmText={`წავშალო "${v.title}"?`} />
            </div>
          </div>
        ))}
        {videos.length === 0 && <p className="p-6 text-sm opacity-50">ვიდეო ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
