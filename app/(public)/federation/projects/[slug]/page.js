import ProjectDetailContent from "@/components/ProjectDetailContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getProjectBySlug } from "@/lib/queries";
import { getServerLang } from "@/lib/getServerLang";
import { stripHtml } from "@/lib/stripHtml";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  const lang = getServerLang();
  const title = (lang === "en" && project.title_en) ? project.title_en : project.title;
  const excerpt = (lang === "en" && project.excerpt_en) ? project.excerpt_en : project.excerpt;
  const description = stripHtml(excerpt)?.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.image_url ? [project.image_url] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();
  const lang = getServerLang();
  const title = (lang === "en" && project.title_en) ? project.title_en : project.title;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: lang === "en" ? "Home" : "მთავარი", url: SITE_URL },
          { name: lang === "en" ? "Projects" : "პროექტები", url: `${SITE_URL}/federation/projects` },
          { name: title, url: `${SITE_URL}/federation/projects/${project.slug}` },
        ]}
      />
      <main className="max-w-3xl mx-auto px-5">
        <ProjectDetailContent project={project} />
      </main>
    </>
  );
}
