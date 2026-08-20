import Trans from "@/components/Trans";
import ProjectCard from "@/components/ProjectCard";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import Reveal from "@/components/Reveal";
import { getAllProjects } from "@/lib/queries";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 5);
  const rest = projects.slice(5);

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ფედერაცია / პროექტები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="projects" /></h1>
        </div>

        <ProjectsShowcase projects={featured} />

        {rest.length > 0 && (
          <>
            <h2 className="font-serif font-bold text-xl mb-6">დანარჩენი პროექტები</h2>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min((i % 5) + 1, 5)}>
                  <ProjectCard {...p} index={i + 5} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        {projects.length === 0 && <p className="opacity-50 text-sm pb-16">პროექტი ჯერ არ არის დამატებული.</p>}
      </main>
    </>
  );
}
