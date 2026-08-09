import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const SECTIONS = [
  { title: "შემადგენლობა", desc: "ფედერაციის ხელმძღვანელობა და თანამშრომლები", href: "/federation/staff" },
  { title: "აღმასკომი", desc: "აღმასრულებელი კომიტეტის შემადგენლობა და გადაწყვეტილებები", href: "/federation/committee" },
  { title: "კომისიები", desc: "სპეციალიზებული კომისიები (მსაჯთა, სამედიცინო, დისციპლინური)", href: "/federation/commissions" },
  { title: "წესდება", desc: "ფედერაციის ოფიციალური წესდება (PDF)", href: "/federation/statute" },
  { title: "რეგიონები", desc: "საქართველოს 13 რეგიონული ორგანიზაცია", href: "/federation/regions" },
  { title: "პროექტები", desc: "ფედერაციის მიმდინარე განვითარების პროექტები", href: "/federation/projects" },
];

export default function FederationPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ფედერაცია</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">ფედერაცია</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i + 1, 5)}>
              <a
                href={s.href}
                className="block bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-serif font-bold text-lg">{s.title}</h3>
                <p className="text-sm opacity-60">{s.desc}</p>
                <span className="text-sm font-bold text-gold mt-1">გახსნა →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
