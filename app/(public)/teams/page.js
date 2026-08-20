"use client";
import { TEAM_CATEGORIES } from "@/lib/teams";
import { useLanguage } from "@/lib/i18n";

export default function TeamsPage() {
  const { t } = useLanguage();

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-9">
          <div className="text-sm opacity-50 mb-3.5">{t("home_bc")} / {t("teams")}</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">{t("teams")}</h1>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-16">
          {TEAM_CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/teams/${cat.slug}`}
              className="bg-ink-2 border border-line rounded-2xl p-5 flex flex-col gap-2 hover:border-gold/50 transition-colors"
            >
              <h3 className="font-serif font-bold text-lg">{t(cat.labelKey)}</h3>
              <p className="text-sm opacity-60">{t(cat.descKey)}</p>
              <span className="text-sm font-bold text-gold mt-1">{t("viewRoster")} →</span>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
