import ProjectDetailContent from "@/components/ProjectDetailContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getProjectBySlug } from "@/lib/queries";
import { stripHtml } from "@/lib/stripHtml";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  const description = stripHtml(project.excerpt)?.slice(0, 160);
  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.image_url ? [project.image_url] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "მთავარი", url: SITE_URL },
          { name: "პროექტები", url: `${SITE_URL}/federation/projects` },
          { name: project.title, url: `${SITE_URL}/federation/projects/${project.slug}` },
        ]}
      />
      <main className="max-w-3xl mx-auto px-5">
        <ProjectDetailContent project={project} />
      </main>
    </>
  );
}
