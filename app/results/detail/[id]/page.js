import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultDetailContent from "@/components/ResultDetailContent";
import { getResultById } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ResultDetailPage({ params }) {
  const result = await getResultById(params.id);
  if (!result) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-5">
        <ResultDetailContent result={result} />
      </main>
      <Footer />
    </>
  );
}
