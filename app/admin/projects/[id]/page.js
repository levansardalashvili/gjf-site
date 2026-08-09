import { getProjectById } from "@/lib/queries";
import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditProjectPage({ params }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">პროექტის რედაქტირება</h1>
      <ProjectForm initial={project} id={params.id} />
    </div>
  );
}
