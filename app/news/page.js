import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
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
          <div className="text-sm opacity-50 mb-3.5">მთავარი / სიახლეები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">სიახლეები</h1>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1.5 mb-8 no-scrollbar">
          {CATEGORIES.map((c, i) => (
            <span key={c} className={`flex-shrink-0 px-4.5 py-2 rounded-full border border-line text-sm font-semibold whitespace-nowrap ${i === 0 ? "bg-crimson border-crimson" : ""}`}>
              {c}
            </span>
          ))}
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-8">
          {news.map((n, i) => (
            <Reveal key={n.slug} delay={Math.min((i % 5) + 1, 5)}>
              <NewsCard {...n} />
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
