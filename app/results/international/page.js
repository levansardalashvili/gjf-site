import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultsTabs from "@/components/ResultsTabs";
import { getResultsByCategory } from "@/lib/queries";
import Trans from "@/components/Trans";

export const revalidate = 0;

export default async function ResultsInternationalPage() {
  const results = await getResultsByCategory("international");
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/results" className="hover:text-gold"><Trans k="results" /></a> / <Trans k="international" />
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="resultsInternational" /></h1>
        </div>
        <div className="pb-16">
          <ResultsTabs results={results} />
        </div>
      </main>
      <Footer />
    </>
  );
}
