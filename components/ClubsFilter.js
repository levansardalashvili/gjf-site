"use client";
import { useState } from "react";
import ClubRow from "./ClubRow";

export default function ClubsFilter({ clubs, regionNames, initialRegion }) {
  const [active, setActive] = useState(initialRegion || "ყველა რეგიონი");
  const chips = ["ყველა რეგიონი", ...regionNames];
  const filtered = active === "ყველა რეგიონი" ? clubs : clubs.filter((c) => c.region === active);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-4">
        {chips.map((r) => (
          <button
            key={r}
            onClick={() => setActive(r)}
            className={`px-3.5 py-1.5 border border-line rounded-2xl text-xs font-semibold transition-colors ${
              active === r ? "bg-crimson border-crimson" : "hover:border-gold/50"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {filtered.map((c) => <ClubRow key={c.id} {...c} />)}
        {filtered.length === 0 && <p className="opacity-50 text-sm py-6">ამ რეგიონში კლუბი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
