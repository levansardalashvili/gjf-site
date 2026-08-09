import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/queries";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ფედერაცია / პროექტები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">პროექტები</h1>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-16">
          {projects.map((p) => (
            <div key={p.slug} className="w-full">
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
        {projects.length === 0 && <p className="opacity-50 text-sm pb-16">პროექტი ჯერ არ არის დამატებული.</p>}
      </main>
      <Footer />
    </>
  );
}
