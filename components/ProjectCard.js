"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { stripHtml } from "@/lib/stripHtml";

export default function ProjectCard({ slug, title, title_en, image_url, excerpt, excerpt_en, fixedWidth = false, index }) {
  const { t, lang } = useLanguage();
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const displayTitle = (lang === "en" && title_en) ? title_en : title;
  const displayExcerpt = stripHtml((lang === "en" && excerpt_en) ? excerpt_en : excerpt);

  return (
    <Link
      href={`/federation/projects/${slug}`}
      className={`group relative block bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
        fixedWidth ? "shrink-0 w-[260px] md:w-[280px]" : "w-full"
      }`}
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]">
        {image_url && <Image src={image_url} alt={displayTitle} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />}

        {number && (
          <span
            className="absolute -bottom-3 left-3 font-serif font-black text-[3.2rem] leading-none text-offwhite/10 group-hover:text-gold/25 transition-colors duration-300 select-none pointer-events-none"
            aria-hidden="true"
          >
            {number}
          </span>
        )}

        {number && (
          <span className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm border border-line text-gold text-xs font-bold px-2.5 py-1 rounded-full">
            {number}
          </span>
        )}
      </div>
      <div className="p-4 pb-5 pt-4 relative">
        <div className="text-[0.68rem] uppercase tracking-wider text-crimson font-bold mb-1.5">{t("project")}</div>
        <h3 className="font-serif font-semibold leading-snug text-sm line-clamp-2">{displayTitle}</h3>
        {displayExcerpt && <p className="text-xs opacity-55 mt-2 line-clamp-2">{displayExcerpt}</p>}
      </div>
    </Link>
  );
}
