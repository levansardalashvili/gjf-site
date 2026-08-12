"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

const SECTIONS = [
  { titleKey: "georgia", descKey: "resultsGeorgiaDesc", href: "/results/georgia" },
  { titleKey: "international", descKey: "resultsInternationalDesc", href: "/results/international" },
];

export default function ResultsPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">{t("home_bc")} / {t("results")}</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">{t("results")}</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pb-16">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors">
              <h3 className="font-serif font-bold text-lg">{t(s.titleKey)}</h3>
              <p className="text-sm opacity-60">{t(s.descKey)}</p>
              <span className="text-sm font-bold text-gold mt-1">{t("viewDetails")} →</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
