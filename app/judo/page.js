"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

const SECTIONS = [
  { titleKey: "judoHistoryTitle", descKey: "judoHistoryDesc", href: "/judo/history" },
  { titleKey: "archive", descKey: "archiveDesc", href: "/judo/archive" },
  { titleKey: "statistics", descKey: "statisticsDesc", href: "/judo/statistic" },
];

export default function JudoPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">{t("home_bc")} / {t("history")}</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">{t("history")}</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pb-16">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors">
              <h3 className="font-serif font-bold text-lg">{t(s.titleKey)}</h3>
              <p className="text-sm opacity-60">{t(s.descKey)}</p>
              <span className="text-sm font-bold text-gold mt-1">{t("open")} →</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
