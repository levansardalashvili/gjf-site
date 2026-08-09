import Link from "next/link";
import { getAllGalleryItems } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminGalleryList() {
  const items = await getAllGalleryItems();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">გალერეა</h1>
        <Link href="/admin/gallery/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {items.map((g) => (
          <div key={g.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50">{g.type === "photo" ? "ფოტო" : "ვიდეო"}</div>
              <div className="font-semibold truncate">{g.title || `ფოტო #${g.id}`}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/gallery/${g.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/gallery/${g.id}`} confirmText="წავშალო ეს ჩანაწერი?" />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="p-6 text-sm opacity-50">გალერეის ჩანაწერი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
