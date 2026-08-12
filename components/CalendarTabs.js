"use client";
import { useState } from "react";
import EventRow from "./EventRow";
import { useLanguage } from "@/lib/i18n";

export default function CalendarTabs({ events, limit }) {
  const [tab, setTab] = useState("georgia");
  const { t } = useLanguage();
  const filteredAll = events.filter((e) => e.category === tab);
  const filtered = limit ? filteredAll.slice(0, limit) : filteredAll;

  return (
    <>
      <div className="flex gap-1 border-b border-line mb-6">
        <button
          onClick={() => setTab("georgia")}
          className={`px-3.5 py-3 mr-1 text-sm font-semibold border-b-2 rounded-t-lg transition-all duration-300 ${
            tab === "georgia"
              ? "opacity-100 border-gold text-gold"
              : "opacity-55 border-transparent hover:opacity-90 hover:bg-ink-2/50 hover:text-gold"
          }`}
        >
          {t("georgia")}
        </button>
        <button
          onClick={() => setTab("international")}
          className={`px-3.5 py-3 mr-1 text-sm font-semibold border-b-2 rounded-t-lg transition-all duration-300 ${
            tab === "international"
              ? "opacity-100 border-gold text-gold"
              : "opacity-55 border-transparent hover:opacity-90 hover:bg-ink-2/50 hover:text-gold"
          }`}
        >
          {t("international")}
        </button>
      </div>
      <div key={tab} className="tab-fade border-t border-line">
        {filtered.length ? filtered.map((e) => <EventRow key={e.slug} {...e} />) : (
          <p className="opacity-50 py-8 text-sm">{t("noEventsInCategory")}</p>
        )}
      </div>
    </>
  );
}
