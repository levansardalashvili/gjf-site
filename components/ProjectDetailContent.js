"use client";
import Image from "next/image";
import Icon from "./Icon";
import Trans from "./Trans";
import { useLanguage } from "@/lib/i18n";

export default function ProjectDetailContent({ project }) {
  const { lang } = useLanguage();
  const title = (lang === "en" && project.title_en) ? project.title_en : project.title;
  const body = (lang === "en" && project.body_en) ? project.body_en : project.body;

  return (
    <>
      <div className="text-sm opacity-50 pt-8 pb-2">
        <a href="/federation/projects" className="hover:text-gold"><Trans k="projects" /></a> / {title}
      </div>

      <article className="py-6">
        <h1 className="font-serif font-bold text-2xl md:text-3xl leading-tight mb-6">{title}</h1>

        {project.image_url && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <Image src={project.image_url} alt={title} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
          </div>
        )}

        {project.file_url && (
          <a
            href={project.file_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-ink-2 border border-line rounded-lg px-4 py-2.5 text-sm font-semibold text-gold mb-6 hover:border-gold/50"
          >
            <Icon name="document" size={16} />
            {project.file_name || <Trans k="downloadPdf" />}
          </a>
        )}

        <div className="whitespace-pre-line leading-relaxed opacity-90 pb-16">{body}</div>
      </article>
    </>
  );
}
