import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getPageBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function StatutePage() {
  const page = await getPageBySlug("federation-statute");
  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/federation" className="hover:text-gold">ფედერაცია</a> / წესდება
          </div>
        </div>

        <div className="flex justify-center pb-16">
          <Reveal className="w-full max-w-2xl">
            <a
              href={page.file_url || "#"}
              target={page.file_url ? "_blank" : undefined}
              rel="noreferrer"
              className="block bg-ink-2 border border-line rounded-3xl p-10 md:p-14 text-center hover:border-gold/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/15 text-gold flex items-center justify-center text-4xl mb-6">
                📄
              </div>
              <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">{page.title}</h1>
              {page.body && (
                <p className="text-sm md:text-base opacity-65 leading-relaxed mb-7 max-w-xl mx-auto">
                  {page.body}
                </p>
              )}
              {page.file_url ? (
                <span className="inline-flex items-center gap-2 bg-crimson px-7 py-3.5 rounded-lg text-sm md:text-base font-bold">
                  PDF ჩამოტვირთვა →
                </span>
              ) : (
                <span className="inline-block text-sm opacity-50">დოკუმენტი ჯერ არ არის ატვირთული</span>
              )}
            </a>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
