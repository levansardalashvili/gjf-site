import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEAM_CATEGORIES } from "@/lib/teams";

export default function TeamsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ნაკრებები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">ეროვნული ნაკრებები</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-16">
          {TEAM_CATEGORIES.map((t) => (
            <a
              key={t.slug}
              href={`/teams/${t.slug}`}
              className="bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors"
            >
              <h3 className="font-serif font-bold text-lg">{t.label}</h3>
              <p className="text-sm opacity-60">{t.desc}</p>
              <span className="text-sm font-bold text-gold mt-1">შემადგენლობის ნახვა →</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
