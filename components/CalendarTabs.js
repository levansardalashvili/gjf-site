"use client";
import { useState } from "react";
import EventRow from "./EventRow";

export default function CalendarTabs({ events }) {
  const [tab, setTab] = useState("georgia");
  const filtered = events.filter((e) => e.category === tab);

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
          საქართველო
        </button>
        <button
          onClick={() => setTab("international")}
          className={`px-3.5 py-3 mr-1 text-sm font-semibold border-b-2 rounded-t-lg transition-all duration-300 ${
            tab === "international"
              ? "opacity-100 border-gold text-gold"
              : "opacity-55 border-transparent hover:opacity-90 hover:bg-ink-2/50 hover:text-gold"
          }`}
        >
          საერთაშორისო
        </button>
      </div>
      <div key={tab} className="tab-fade border-t border-line">
        {filtered.length ? filtered.map((e) => <EventRow key={e.slug} {...e} />) : (
          <p className="opacity-50 py-8 text-sm">ამ კატეგორიაში ღონისძიება არ არის.</p>
        )}
      </div>
    </>
  );
}
