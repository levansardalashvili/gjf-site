import Link from "next/link";
import Icon from "@/components/Icon";
import Image from "next/image";
import { getAllNews } from "@/lib/queries";
import { timeAgo } from "@/lib/timeAgo";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminNewsList() {
  const news = await getAllNews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">სიახლეები</h1>
        <Link href="/admin/news/new" className="bg-crimson px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {news.map((n) => (
          <div key={n.id} className="group flex items-center gap-4 px-5 py-3.5 border-b border-line last:border-0 hover:bg-ink/40 transition-colors">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-ink border border-line">
              {n.image_url && <Image src={n.image_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs opacity-50">{n.date} {n.created_at && `· დაემატა ${timeAgo(n.created_at)}`}</div>
              <div className="font-semibold truncate">{n.title}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/admin/news/${n.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/news/${n.id}`} confirmText={`"${n.title}" მუდმივად წაიშლება — ამის დაბრუნება შეუძლებელია.`} />
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div className="p-10 text-center">
            <div className="flex justify-center mb-2 opacity-40"><Icon name="scroll" size={30} /></div>
            <p className="text-sm opacity-50 mb-3">სიახლე ჯერ არ არის დამატებული.</p>
            <Link href="/admin/news/new" className="text-sm text-gold font-semibold">+ პირველი სიახლის დამატება</Link>
          </div>
        )}
      </div>
    </div>
  );
}
