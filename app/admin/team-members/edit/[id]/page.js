import { getTeamMemberById } from "@/lib/queries";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditTeamMemberPage({ params }) {
  const member = await getTeamMemberById(params.id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">სპორტსმენის რედაქტირება</h1>
      <TeamMemberForm initial={member} id={params.id} />
    </div>
  );
}
