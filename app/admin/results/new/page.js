import ResultForm from "@/components/admin/ResultForm";

export default function NewResultPage({ searchParams }) {
  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ახალი შედეგი</h1>
      <ResultForm defaultCategory={searchParams?.category} defaultAgeGroup={searchParams?.age_group} />
    </div>
  );
}
