import Link from "next/link";
import { getGalleryByType } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminVideosList() {
  const videos = await getGalleryByType("video");

  return (
    <div>
      <div className="text-sm opacity-50 mb-3">
        <Link href="/admin/gallery" className="hover:text-gold">გალერეა</Link> / ვიდეო გალერეა
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">ვიდეო გალერეა</h1>
        <Link href="/admin/gallery/videos/new" className="bg-crimson px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {videos.map((v) => (
          <div key={v.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="font-semibold truncate">{v.title}</div>
              {v.views && <div className="text-xs opacity-50">{v.views}</div>}
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/gallery/videos/edit/${v.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/gallery/${v.id}`} confirmText={`"${v.title}" მუდმივად წაიშლება.`} />
            </div>
          </div>
        ))}
        {videos.length === 0 && <p className="p-6 text-sm opacity-50">ვიდეო ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
