import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultDetailContent from "@/components/ResultDetailContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getResultById } from "@/lib/queries";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

export const revalidate = 0;

export default async function ResultDetailPage({ params }) {
  const result = await getResultById(params.id);
  if (!result) notFound();

  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "მთავარი", url: SITE_URL },
          { name: "შედეგები", url: `${SITE_URL}/results` },
          { name: result.event_name, url: `${SITE_URL}/results/detail/${result.id}` },
        ]}
      />
      <main className="max-w-3xl mx-auto px-5">
        <ResultDetailContent result={result} />
      </main>
      <Footer />
    </>
  );
}
