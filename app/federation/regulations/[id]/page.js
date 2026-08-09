import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getRegulationById } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function RegulationDetailPage({ params }) {
  const regulation = await getRegulationById(params.id);
  if (!regulation) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-5">
        <div className="text-sm opacity-50 pt-8 pb-2">
          <a href="/federation/regulations" className="hover:text-gold">დებულებები</a> / {regulation.title}
        </div>

        <article className="py-6">
          <h1 className="font-serif font-bold text-2xl md:text-3xl leading-tight mb-6">{regulation.title}</h1>

          {regulation.file_url && (
            <a
              href={regulation.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink-2 border border-line rounded-lg px-4 py-2.5 text-sm font-semibold text-gold mb-6 hover:border-gold/50 transition-colors"
            >
              📄 {regulation.file_name || "დოკუმენტის ჩამოტვირთვა (PDF)"}
            </a>
          )}

          <div className="whitespace-pre-line leading-relaxed opacity-90 pb-16">{regulation.body}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
