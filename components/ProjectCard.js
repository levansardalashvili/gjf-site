"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function ProjectCard({ slug, title, image_url, excerpt, fixedWidth = false, index }) {
  const { t } = useLanguage();
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link
      href={`/federation/projects/${slug}`}
      className={`group relative block bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
        fixedWidth ? "shrink-0 w-[260px] md:w-[280px]" : "w-full"
      }`}
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]">
        {image_url && <Image src={image_url} alt={title} fill className="object-cover" />}

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
        <h3 className="font-serif font-semibold leading-snug text-sm line-clamp-2">{title}</h3>
        {excerpt && <p className="text-xs opacity-55 mt-2 line-clamp-2">{excerpt}</p>}
      </div>
    </Link>
  );
}
