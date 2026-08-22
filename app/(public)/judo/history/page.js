import { renderRichHtml } from "@/lib/richHtml";
import Icon from "@/components/Icon";
import { getPageBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Page() {
  const page = await getPageBySlug("judo-history");
  if (!page) notFound();

  return (
    <>
      <main className="max-w-4xl mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ისტორია / განვითარების ისტორია</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-5">{page.title}</h1>

          {page.file_url && (
            <a
              href={page.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink-2 border border-line rounded-lg px-4 py-2.5 text-sm font-semibold text-gold mb-6 hover:border-gold/50"
            >
              <Icon name="document" size={16} />
              {page.file_name || "დოკუმენტის ჩამოტვირთვა (PDF)"}
            </a>
          )}

          <div className="pb-16 leading-relaxed opacity-90 rich-content" dangerouslySetInnerHTML={{ __html: renderRichHtml(page.body) }} />
        </div>
      </main>
    </>
  );
}
