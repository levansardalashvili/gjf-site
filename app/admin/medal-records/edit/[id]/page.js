import { getMedalRecordById } from "@/lib/queries";
import MedalRecordForm from "@/components/admin/MedalRecordForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditMedalRecordPage({ params }) {
  const record = await getMedalRecordById(params.id);
  if (!record) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">მედლების ჩანაწერის რედაქტირება</h1>
      <MedalRecordForm initial={record} id={params.id} />
    </div>
  );
}
