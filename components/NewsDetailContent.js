"use client";
import Image from "next/image";
import Trans from "./Trans";
import ShareButtons from "./ShareButtons";
import { useLanguage } from "@/lib/i18n";

export default function NewsDetailContent({ item }) {
  const { lang } = useLanguage();
  const title = (lang === "en" && item.title_en) ? item.title_en : item.title;
  const body = (lang === "en" && item.body_en) ? item.body_en : item.body;
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <div className="text-sm opacity-50 pt-8 pb-2">
        <a href="/news" className="hover:text-gold"><Trans k="news" /></a> / {title}
      </div>
      <article className="py-6">
        <div className="text-xs opacity-55 mb-3 uppercase tracking-wide">{item.date}</div>
        {item.medal && (
          <span className="inline-block bg-gold text-white text-xs font-extrabold px-2.5 py-1 rounded-full mb-4">{item.medal}</span>
        )}
        <h1 className="font-serif font-bold text-3xl md:text-4xl leading-tight mb-6">{title}</h1>
        {item.image_url ? (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <Image src={item.image_url} alt={title} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
          </div>
        ) : (
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#2a2f38] to-[#1a1d23] mb-6" />
        )}
        <div className="text-lg leading-relaxed opacity-90 rich-content mb-8" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="border-t border-line pt-6">
          <ShareButtons url={url} title={title} />
        </div>
      </article>
    </>
  );
}
