import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Trans from "@/components/Trans";
import Icon from "@/components/Icon";
import { getProjectBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.image_url ? [project.image_url] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-5">
        <div className="text-sm opacity-50 pt-8 pb-2">
          <a href="/federation/projects" className="hover:text-gold"><Trans k="projects" /></a> / {project.title}
        </div>

        <article className="py-6">
          <h1 className="font-serif font-bold text-2xl md:text-3xl leading-tight mb-6">{project.title}</h1>

          {project.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
              <Image src={project.image_url} alt={project.title} fill className="object-cover" />
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

          <div className="whitespace-pre-line leading-relaxed opacity-90 pb-16">{project.body}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
