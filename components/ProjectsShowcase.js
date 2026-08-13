"use client";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n";

export default function ProjectsShowcase({ projects }) {
  const { t, lang } = useLanguage();
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-14 md:gap-20 pb-16">
      {projects.map((p, i) => {
        const number = String(i + 1).padStart(2, "0");
        const imageOnRight = i % 2 === 1; // მონაცვლეობით: ლუწზე ფოტო მარჯვნივ
        const displayTitle = (lang === "en" && p.title_en) ? p.title_en : p.title;
        const displayExcerpt = (lang === "en" && p.excerpt_en) ? p.excerpt_en : p.excerpt;

        return (
          <div
            key={p.slug}
            className={`flex flex-col ${imageOnRight ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 md:gap-12`}
          >
            <Reveal variant={imageOnRight ? "right" : "left"} className="w-full md:w-1/2">
              <Link href={`/federation/projects/${p.slug}`} className="block group">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#2a2f38] to-[#1a1d23] border border-line">
                  {p.image_url && (
                    <Image
                      src={p.image_url}
                      alt={displayTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
              </Link>
            </Reveal>

            <Reveal variant={imageOnRight ? "left" : "right"} delay={2} className="w-full md:w-1/2">
              <span className="font-serif font-black text-5xl md:text-6xl text-gold/25 leading-none block mb-3">
                {number}
              </span>
              <div className="text-xs uppercase tracking-wider text-crimson font-bold mb-2">
                {t("project")} · {number}
              </div>
              <h3 className="font-serif font-bold text-2xl md:text-3xl leading-tight mb-3">{displayTitle}</h3>
              {displayExcerpt && <p className="opacity-65 leading-relaxed mb-4">{displayExcerpt}</p>}
              <Link
                href={`/federation/projects/${p.slug}`}
                className="inline-block text-sm font-bold text-gold hover:opacity-80 transition-opacity"
              >
                {t("viewDetails")} →
              </Link>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
