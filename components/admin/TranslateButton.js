"use client";
import { useState } from "react";
import Icon from "@/components/Icon";

// პატარა "თარგმნა" ღილაკი — ქართული ველის შიგთავსს გზავნის /api/translate-ზე
// და შედეგს onTranslated(text)-ით უბრუნებს გამომძახებელ ფორმას.
export default function TranslateButton({ sourceText, onTranslated }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!sourceText || !sourceText.trim()) return;
    setLoading(true);
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sourceText, source: "ka", target: "en" }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) onTranslated(data.translated);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:opacity-80 transition-opacity disabled:opacity-40 whitespace-nowrap"
    >
      <Icon name="globe" size={13} />
      {loading ? "თარგმნა..." : "თარგმნა ქართულიდან"}
    </button>
  );
}
