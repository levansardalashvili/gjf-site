import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsGrid from "@/components/NewsGrid";
import Trans from "@/components/Trans";
import { getAllNews } from "@/lib/queries";

export const revalidate = 60;

const CATEGORIES = ["ყველა", "ეროვნული ნაკრები", "საერთაშორისო", "ახალგაზრდები", "კლუბები/რეგიონები", "ფედერაცია"];

export default async function NewsArchive() {
  const news = await getAllNews();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5"><Trans k="home_bc" /> / <Trans k="news" /></div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="news" /></h1>
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-55 hover:opacity-100 hover:text-gold transition-colors border border-line rounded-full px-3 py-1.5"
            >
              RSS
            </a>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1.5 mb-8 no-scrollbar">
          {CATEGORIES.map((c, i) => (
            <span key={c} className={`flex-shrink-0 px-4.5 py-2 rounded-full border border-line text-sm font-semibold whitespace-nowrap ${i === 0 ? "bg-crimson border-crimson" : ""}`}>
              {c}
            </span>
          ))}
        </div>

        <NewsGrid news={news} />
      </main>
      <Footer />
    </>
  );
}
