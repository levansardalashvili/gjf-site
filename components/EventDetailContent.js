"use client";
import { renderRichHtml } from "@/lib/richHtml";
import Icon from "./Icon";
import Trans from "./Trans";
import { useLanguage } from "@/lib/i18n";

export default function EventDetailContent({ event }) {
  const { lang } = useLanguage();
  const description = (lang === "en" && event.description_en) ? event.description_en : event.description;

  return (
    <>
      <div className="text-sm opacity-50 pt-8 pb-2">
        <a href="/calendar" className="hover:text-gold"><Trans k="calendar" /></a> / {event.title}
      </div>
      <div className="my-6 rounded-2xl overflow-hidden bg-gradient-to-br from-crimson to-crimson-dark p-7 text-white">
        <span className="inline-block bg-white/20 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase mb-4">{event.tag}</span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl leading-tight mb-4">{event.title}</h1>
        <div className="flex flex-wrap gap-5 text-sm text-white/85">
          <div className="flex items-center gap-2"><Icon name="calendar" size={15} />{event.date_range}</div>
          <div className="flex items-center gap-2"><Icon name="pin" size={15} />{event.location}</div>
        </div>
      </div>
      {description && <div className="opacity-80 mb-16 rich-content" dangerouslySetInnerHTML={{ __html: renderRichHtml(description) }} />}
    </>
  );
}
