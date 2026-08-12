"use client";
import Icon from "@/components/Icon";
import { useState } from "react";

// მრგვალი "🌐 თარგმნა" ღილაკი — ქართული ველის შიგთავსს გზავნის /api/translate-ზე
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
      className="text-xs font-semibold text-gold hover:opacity-80 transition-opacity disabled:opacity-40 whitespace-nowrap"
    >
      {loading ? "თარგმნა..." : (<span className="inline-flex items-center gap-1"><Icon name="globe" size={13} />ქართულიდან თარგმნა</span>)}
    </button>
  );
}
