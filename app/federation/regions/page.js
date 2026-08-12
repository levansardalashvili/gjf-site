import Header from "@/components/Header";
import Trans from "@/components/Trans";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getAllRegions } from "@/lib/queries";

export const revalidate = 0;

export default async function FederationRegionsPage() {
  const regions = await getAllRegions();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/federation" className="hover:text-gold"><Trans k="federation" /></a> / <Trans k="regions" />
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="regions" /></h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-16">
          {regions.map((r, i) => (
            <Reveal key={r.id} delay={Math.min((i % 5) + 1, 5)}>
              <a
                href={`/clubs?region=${encodeURIComponent(r.name)}`}
                className="block bg-ink-2 border border-line rounded-2xl p-5 h-full hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-serif font-bold text-base mb-1">{r.name}</h3>
                <span className="text-sm font-bold text-gold"><Trans k="clubsCount" /> →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
