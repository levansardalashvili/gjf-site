import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getPageBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Page() {
  const page = await getPageBySlug("federation-structure");
  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ფედერაცია / სტრუქტურა</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-5">{page.title}</h1>

          {page.file_url && (
            <a
              href={page.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink-2 border border-line rounded-lg px-4 py-2.5 text-sm font-semibold text-gold mb-6 hover:border-gold/50"
            >
              📄 {page.file_name || "დოკუმენტის ჩამოტვირთვა (PDF)"}
            </a>
          )}

          <div className="whitespace-pre-line leading-relaxed opacity-90">{page.body}</div>

          <div className="mt-8 bg-white rounded-2xl p-4 md:p-6">
            <Image
              src="/federation-structure-chart.webp"
              alt="საქართველოს ჯუდოს ეროვნული ფედერაციის ორგანიზაციული სტრუქტურა"
              width={727}
              height={828}
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
