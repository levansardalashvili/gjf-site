import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  { title: "საქართველო", desc: "ეროვნული ტურნირების შედეგები.", href: "/results/georgia" },
  { title: "საერთაშორისო", desc: "საერთაშორისო ტურნირების შედეგები.", href: "/results/international" },
];

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / შედეგები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">შედეგები</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pb-16">
          {SECTIONS.map((s) => (
            <a key={s.title} href={s.href} className="bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors">
              <h3 className="font-serif font-bold text-lg">{s.title}</h3>
              <p className="text-sm opacity-60">{s.desc}</p>
              <span className="text-sm font-bold text-gold mt-1">ნახვა →</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
