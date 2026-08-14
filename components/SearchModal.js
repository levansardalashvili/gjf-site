"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

const SECTIONS = [
  { key: "news", label: "სიახლეები", titleField: "title", href: (i) => `/news/${i.slug}` },
  { key: "events", label: "კალენდარი", titleField: "title", href: (i) => `/calendar/${i.slug}` },
  { key: "results", label: "შედეგები", titleField: "event_name", href: (i) => `/results/detail/${i.id}` },
  { key: "athletes", label: "შემადგენლობა", titleField: "name", href: () => "/teams" },
  { key: "projects", label: "პროექტები", titleField: "title", href: (i) => `/federation/projects/${i.slug}` },
  { key: "clubs", label: "კლუბები", titleField: "name", href: () => "/clubs" },
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const runSearch = useCallback(async (q) => {
    if (q.trim().length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setLoading(false);
    if (res.status === 429) {
      setRateLimited(true);
      setResults(null);
      return;
    }
    setRateLimited(false);
    setResults(data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, runSearch]);

  function goTo(href) {
    router.push(href);
    onClose();
  }

  if (!open) return null;

  const totalHits = results ? Object.values(results).reduce((sum, arr) => sum + arr.length, 0) : 0;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[10vh] p-5">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm modal-fade" onClick={onClose} />
      <div className="relative modal-pop bg-ink border border-line rounded-2xl w-full max-w-xl shadow-2xl max-h-[75vh] flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <Icon name="search" size={18} className="opacity-50 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="მოძებნე სიახლე, სპორტსმენი, კლუბი..."
            className="flex-1 bg-transparent py-4 text-sm outline-none"
          />
          <button onClick={onClose} className="shrink-0 opacity-50 hover:opacity-100">
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {loading && <p className="text-sm opacity-50 p-6 text-center">იძებნება...</p>}

          {rateLimited && (
            <p className="text-sm text-crimson p-6 text-center">მოთხოვნები ძალიან ხშირია — ცოტა ხნის შემდეგ სცადე.</p>
          )}

          {!loading && query.trim().length >= 2 && results && totalHits === 0 && (
            <p className="text-sm opacity-50 p-6 text-center">ვერაფერი მოიძებნა "{query}"-სთვის.</p>
          )}

          {!loading && results && totalHits > 0 && (
            <div className="py-2">
              {SECTIONS.map((section) => {
                const items = results[section.key];
                if (!items || items.length === 0) return null;
                return (
                  <div key={section.key} className="mb-2">
                    <div className="px-4 py-1.5 text-[0.68rem] uppercase tracking-wide opacity-45 font-bold">
                      {section.label}
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.id || item.slug}
                        onClick={() => goTo(section.href(item))}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-ink-2 transition-colors truncate"
                      >
                        {item[section.titleField]}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {!query && (
            <p className="text-sm opacity-40 p-6 text-center">დაწერე მინიმუმ 2 სიმბოლო ძებნის დასაწყებად.</p>
          )}
        </div>
      </div>
    </div>
  );
}
