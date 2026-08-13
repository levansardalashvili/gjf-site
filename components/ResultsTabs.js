"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import Icon from "./Icon";
import Pagination from "./Pagination";
import { useLanguage } from "@/lib/i18n";

const GROUPS = [
  { key: "standart", labelKey: "seniors" },
  { key: "youth", labelKey: "juniors" },
  { key: "kids", labelKey: "cadets" },
  { key: "women", labelKey: "women_bc" },
];

const PER_PAGE = 15;

export default function ResultsTabs({ results }) {
  const [tab, setTab] = useState("standart");
  const [page, setPage] = useState(1);
  const { t, lang } = useLanguage();

  const filtered = useMemo(() => results.filter((r) => r.age_group === tab), [results, tab]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function selectTab(key) {
    setTab(key);
    setPage(1);
  }

  return (
    <>
      <div className="flex gap-2 border-b border-line mb-6">
        {GROUPS.map((g) => (
          <button
            key={g.key}
            onClick={() => selectTab(g.key)}
            className={`px-1.5 py-3 mr-5 text-sm font-semibold border-b-2 transition-colors ${
              tab === g.key ? "opacity-100 border-gold text-gold" : "opacity-55 border-transparent hover:opacity-80"
            }`}
          >
            {t(g.labelKey)}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <>
          <div key={`${tab}-${page}`} className="tab-fade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((r, i) => (
              <Reveal key={r.id} delay={Math.min((i % 5) + 1, 5)}>
                <Link
                  href={`/results/detail/${r.id}`}
                  className="block bg-ink-2 border border-line rounded-2xl p-5 h-full hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  {r.medal && (
                    <span className="inline-block bg-gold text-white text-xs font-extrabold px-2.5 py-1 rounded-full mb-3">
                      {r.medal}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-base leading-snug mb-2">{(lang === "en" && r.event_name_en) ? r.event_name_en : r.event_name}</h3>
                  <div className="text-xs opacity-55 space-y-0.5">
                    {r.event_date && <div className="flex items-center gap-1.5"><Icon name="calendar" size={13} />{r.event_date}</div>}
                    {r.weight && <div>{r.weight}</div>}
                    {r.athlete && r.athlete !== "—" && <div className="flex items-center gap-1.5"><Icon name="judo" size={13} />{r.athlete}</div>}
                  </div>
                  <span className="inline-block text-sm font-bold text-gold mt-3">{t("viewDetails")} →</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      ) : (
        <p className="opacity-50 text-sm py-8">{t("noResultsYet")}</p>
      )}
    </>
  );
}
