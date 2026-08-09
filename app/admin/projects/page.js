import Link from "next/link";
import { getAllProjects } from "@/lib/queries";
import DeleteButton from "@/components/admin/DeleteButton";

export const revalidate = 0;

export default async function AdminProjectsList() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif font-bold text-2xl">პროექტები</h1>
        <Link href="/admin/projects/new" className="bg-crimson px-4 py-2 rounded-lg text-sm font-bold">+ ახალი</Link>
      </div>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="font-semibold truncate">{p.title}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/projects/${p.id}`} className="text-sm text-gold font-semibold">რედაქტირება</Link>
              <DeleteButton endpoint={`/api/projects/${p.id}`} confirmText={`წავშალო "${p.title}"?`} />
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="p-6 text-sm opacity-50">პროექტი ჯერ არ არის დამატებული.</p>}
      </div>
    </div>
  );
}
