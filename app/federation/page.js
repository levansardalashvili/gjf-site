"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

const SECTIONS = [
  { titleKey: "staff", descKey: "staffDesc", href: "/federation/staff" },
  { titleKey: "committee", descKey: "committeeDesc", href: "/federation/committee" },
  { titleKey: "commissions", descKey: "commissionsDesc", href: "/federation/commissions" },
  { titleKey: "statute", descKey: "statuteDesc", href: "/federation/statute" },
  { titleKey: "regions", descKey: "regionsDesc", href: "/federation/regions" },
  { titleKey: "projects", descKey: "projectsDesc", href: "/federation/projects" },
];

export default function FederationPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">{t("home_bc")} / {t("federation")}</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">{t("federation")}</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.href} delay={Math.min(i + 1, 5)}>
              <a
                href={s.href}
                className="block bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-serif font-bold text-lg">{t(s.titleKey)}</h3>
                <p className="text-sm opacity-60">{t(s.descKey)}</p>
                <span className="text-sm font-bold text-gold mt-1">{t("open")} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
