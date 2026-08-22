import { renderRichHtml } from "@/lib/richHtml";
import { getPageBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function TeamStaffPage() {
  const page = await getPageBySlug("national-team-staff");
  if (!page) notFound();

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/teams" className="hover:text-gold">ნაკრებები</a> / {page.title}
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-5">{page.title}</h1>
          <div className="pb-16 leading-relaxed opacity-90 rich-content" dangerouslySetInnerHTML={{ __html: renderRichHtml(page.body) }} />
        </div>
      </main>
    </>
  );
}
