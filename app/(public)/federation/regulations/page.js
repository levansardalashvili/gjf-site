import Icon from "@/components/Icon";
import Trans from "@/components/Trans";
import Reveal from "@/components/Reveal";
import { getAllRegulations } from "@/lib/queries";
import { stripHtml } from "@/lib/stripHtml";

export const revalidate = 60;

export default async function FederationRegulationsPage() {
  const regulations = await getAllRegulations();

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/federation" className="hover:text-gold"><Trans k="federation" /></a> / <Trans k="regulations" />
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="regulations" /></h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
          {regulations.map((r, i) => (
            <Reveal key={r.id} delay={Math.min((i % 5) + 1, 5)}>
              <a
                href={r.file_url || "#"}
                target={r.file_url ? "_blank" : undefined}
                rel="noreferrer"
                className="block bg-ink-2 border border-line rounded-2xl p-6 h-full hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold flex items-center justify-center mb-4">
                  <Icon name="document" size={18} />
                </div>
                <h3 className="font-serif font-bold text-base leading-snug mb-2">{r.title}</h3>
                {r.excerpt && <p className="text-sm opacity-60 leading-relaxed">{stripHtml(r.excerpt)}</p>}
                {r.file_url && <span className="inline-block text-sm font-bold text-gold mt-3">PDF ჩამოტვირთვა →</span>}
              </a>
            </Reveal>
          ))}
        </div>
        {regulations.length === 0 && <p className="opacity-50 text-sm pb-16"><Trans k="noRegulationsYet" /></p>}
      </main>
    </>
  );
}
