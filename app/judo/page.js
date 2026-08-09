import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  { title: "ძიუდოს განვითარების ისტორია", desc: "ჯუდოს განვითარების ისტორია საქართველოში.", href: "/judo/history" },
  { title: "არქივი", desc: "ისტორიული მასალების არქივი.", href: "/judo/archive" },
  { title: "სტატისტიკა", desc: "ისტორიული სტატისტიკური მონაცემები.", href: "/judo/statistic" },
];

export default function JudoPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ისტორია</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">ისტორია</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pb-16">
          {SECTIONS.map((s) => (
            <a key={s.title} href={s.href} className="bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors">
              <h3 className="font-serif font-bold text-lg">{s.title}</h3>
              <p className="text-sm opacity-60">{s.desc}</p>
              <span className="text-sm font-bold text-gold mt-1">გახსნა →</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
