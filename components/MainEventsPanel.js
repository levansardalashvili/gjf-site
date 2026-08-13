"use client";
import Link from "next/link";
import Icon from "./Icon";
import { useLanguage } from "@/lib/i18n";

export default function MainEventsPanel({ events }) {
  const { lang } = useLanguage();
  const title = lang === "en" ? "Main Events" : "მთავარი ღონისძიებები";

  if (events.length === 0) return null;

  return (
    <div className="bg-ink-2 border border-line rounded-2xl p-4 flex flex-col gap-3 h-full">
      <h3 className="font-serif font-bold text-base px-1">{title}</h3>
      <div className="flex flex-col gap-2.5 flex-1">
        {events.map((e) => (
          <Link
            key={e.slug}
            href={`/calendar/${e.slug}`}
            className="group bg-ink border border-line rounded-xl p-3.5 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
            <span className="inline-block bg-crimson text-white text-[0.65rem] font-extrabold px-2.5 py-1 rounded-full mb-2">
              {e.date_range}
            </span>
            <div className="font-semibold text-sm leading-snug group-hover:text-gold transition-colors line-clamp-2">
              {e.title}
            </div>
            <div className="flex items-center gap-1.5 text-xs opacity-55 mt-1.5">
              <Icon name="pin" size={12} />
              {e.location}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
