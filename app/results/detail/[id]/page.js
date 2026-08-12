import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Trans from "@/components/Trans";
import Icon from "@/components/Icon";
import { getResultById } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

const CAT_KEY = { georgia: "georgia", international: "international" };
const GROUP_KEY = { standart: "seniors", youth: "juniors", kids: "cadets", women: "women_bc" };

export default async function ResultDetailPage({ params }) {
  const result = await getResultById(params.id);
  if (!result) notFound();

  const backHref = result.category === "georgia" ? "/results/georgia" : "/results/international";

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-5">
        <div className="text-sm opacity-50 pt-8 pb-2">
          <a href="/results" className="hover:text-gold"><Trans k="results" /></a> /{" "}
          <a href={backHref} className="hover:text-gold"><Trans k={CAT_KEY[result.category]} /></a> / {result.event_name}
        </div>

        <div className="my-6 rounded-2xl overflow-hidden bg-gradient-to-br from-crimson to-crimson-dark p-7 text-white">
          <span className="inline-block bg-white/20 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase mb-4">
            <Trans k={CAT_KEY[result.category]} /> · <Trans k={GROUP_KEY[result.age_group]} />
          </span>
          <h1 className="font-serif font-bold text-2xl md:text-4xl leading-tight mb-3">{result.event_name}</h1>
          {result.event_date && <div className="text-sm text-white/80 flex items-center gap-1.5"><Icon name="calendar" size={14} />{result.event_date}</div>}
        </div>

        {(result.weight || (result.athlete && result.athlete !== "—") || result.medal) && (
          <div className="bg-ink-2 border border-line rounded-2xl p-6 mb-6">
            <h2 className="font-serif font-bold text-lg mb-3"><Trans k="resultLabel" /></h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {result.weight && <div><span className="opacity-55"><Trans k="weightLabel" />:</span> {result.weight}</div>}
              {result.athlete && result.athlete !== "—" && <div><span className="opacity-55"><Trans k="athleteLabel" />:</span> {result.athlete}</div>}
              {result.medal && <div><span className="opacity-55"><Trans k="medalLabel" />:</span> {result.medal}</div>}
            </div>
          </div>
        )}

        <div className="pb-16">
          {result.source_url && (
            <div className="bg-ink-2 border border-line rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap mb-4">
              <div>
                <div className="text-xs uppercase tracking-wide opacity-55 mb-1"><Trans k="results" /></div>
                <a href={result.source_url} target="_blank" rel="noreferrer" className="text-gold font-semibold hover:opacity-80 transition-opacity break-all">
                  {result.source_url}
                </a>
              </div>
            </div>
          )}

          {result.file_url && (
            <a
              href={result.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink-2 border border-line rounded-lg px-4 py-2.5 text-sm font-semibold text-gold hover:border-gold/50 transition-colors"
            >
              <Icon name="document" size={16} />
              {result.file_name || <Trans k="downloadPdf" />}
            </a>
          )}

          {!result.source_url && !result.file_url && (
            <p className="opacity-50 text-sm"><Trans k="noDetailedResults" /></p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
