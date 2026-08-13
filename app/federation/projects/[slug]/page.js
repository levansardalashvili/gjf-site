import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectDetailContent from "@/components/ProjectDetailContent";
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
        <ProjectDetailContent project={project} />
      </main>
      <Footer />
    </>
  );
}
