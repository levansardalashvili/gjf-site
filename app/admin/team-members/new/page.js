import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage({ searchParams }) {
  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ახალი სპორტსმენი</h1>
      <TeamMemberForm defaultCategory={searchParams?.category} />
    </div>
  );
}
