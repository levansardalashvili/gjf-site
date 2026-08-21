import Link from "next/link";
import { getAllPages, getAllSocialLinks } from "@/lib/queries";
import { stripHtml } from "@/lib/stripHtml";
import SocialLinksManager from "@/components/admin/SocialLinksManager";

export const revalidate = 0;

export default async function AdminContactPage() {
  const allPages = await getAllPages();
  const pages = allPages.filter((p) => p.slug.startsWith("contact-"));
  const socialLinks = await getAllSocialLinks();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">კონტაქტი და სოც. ქსელები</h1>
      <p className="text-sm opacity-55 mb-6">მისამართი, ელფოსტა, ტელეფონი, სოც. ქსელების ბმულები — საიტის /contact გვერდზე ჩანს.</p>

      <SocialLinksManager links={socialLinks} />

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {pages.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="text-xs opacity-50 font-mono">{p.slug}</div>
              <div className="font-semibold truncate">{p.title}: <span className="font-normal opacity-70">{stripHtml(p.body)}</span></div>
            </div>
            <Link href={`/admin/pages/${p.id}`} className="text-sm text-gold font-semibold shrink-0">რედაქტირება</Link>
          </div>
        ))}
        {pages.length === 0 && <p className="p-6 text-sm opacity-50">ჩანაწერი არ არის.</p>}
      </div>
    </div>
  );
}
