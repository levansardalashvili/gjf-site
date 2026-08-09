"use client";
import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

const GROUPS = [
  { key: "standart", label: "უფროსები" },
  { key: "youth", label: "ახალგაზრდები" },
  { key: "kids", label: "ჭაბუკები" },
];

export default function ResultsTabs({ results }) {
  const [tab, setTab] = useState("standart");
  const filtered = results.filter((r) => r.age_group === tab);

  return (
    <>
      <div className="flex gap-2 border-b border-line mb-6">
        {GROUPS.map((g) => (
          <button
            key={g.key}
            onClick={() => setTab(g.key)}
            className={`px-1.5 py-3 mr-5 text-sm font-semibold border-b-2 transition-colors ${
              tab === g.key ? "opacity-100 border-gold text-gold" : "opacity-55 border-transparent hover:opacity-80"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <Reveal key={r.id} delay={Math.min((i % 5) + 1, 5)}>
              <Link
                href={`/results/detail/${r.id}`}
                className="block bg-ink-2 border border-line rounded-2xl p-5 h-full hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {r.medal && (
                  <span className="inline-block bg-gold text-ink text-xs font-extrabold px-2.5 py-1 rounded-full mb-3">
                    {r.medal}
                  </span>
                )}
                <h3 className="font-serif font-bold text-base leading-snug mb-2">{r.event_name}</h3>
                <div className="text-xs opacity-55 space-y-0.5">
                  {r.event_date && <div>📅 {r.event_date}</div>}
                  {r.weight && <div>⚖️ {r.weight}</div>}
                  {r.athlete && r.athlete !== "—" && <div>🥋 {r.athlete}</div>}
                </div>
                <span className="inline-block text-sm font-bold text-gold mt-3">დეტალურად →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="opacity-50 text-sm py-8">ამ კატეგორიაში შედეგები ჯერ არ არის დამატებული.</p>
      )}
    </>
  );
}
