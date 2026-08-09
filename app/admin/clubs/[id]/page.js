import { getClubById } from "@/lib/queries";
import ClubForm from "@/components/admin/ClubForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditClubPage({ params }) {
  const item = await getClubById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">კლუბის რედაქტირება</h1>
      <ClubForm initial={item} id={params.id} />
    </div>
  );
}
