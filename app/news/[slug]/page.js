import { getAllNews, getNewsBySlug } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) return {};
  return {
    title: `${item.title} — საქართველოს ჯუდოს ფედერაცია`,
    description: item.excerpt,
    openGraph: { title: item.title, description: item.excerpt, type: "article" },
  };
}

export default async function NewsDetailPage({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) notFound();

  const allNews = await getAllNews();
  const related = allNews.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-5">
        <div className="text-sm opacity-50 pt-8 pb-2">
          <a href="/news" className="hover:text-gold">სიახლეები</a> / {item.title}
        </div>
        <article className="py-6">
          <div className="text-xs opacity-55 mb-3 uppercase tracking-wide">{item.date}</div>
          {item.medal && (
            <span className="inline-block bg-gold text-ink text-xs font-extrabold px-2.5 py-1 rounded-full mb-4">{item.medal}</span>
          )}
          <h1 className="font-serif font-bold text-3xl md:text-4xl leading-tight mb-6">{item.title}</h1>
          {item.image_url ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
              <Image src={item.image_url} alt={item.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#2a2f38] to-[#1a1d23] mb-6" />
          )}
          <p className="text-lg leading-relaxed opacity-90">{item.body}</p>
        </article>
        {related.length > 0 && (
          <section className="py-10 border-t border-line">
            <h2 className="font-serif font-bold text-xl mb-5">სხვა სიახლეები</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              {related.map((n) => <NewsCard key={n.slug} {...n} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
