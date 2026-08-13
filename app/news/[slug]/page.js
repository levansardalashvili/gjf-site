import { getAllNews, getNewsBySlug } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import NewsDetailContent from "@/components/NewsDetailContent";
import Trans from "@/components/Trans";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.body?.slice(0, 160),
    openGraph: {
      title: item.title,
      description: item.body?.slice(0, 160),
      type: "article",
      images: item.image_url ? [item.image_url] : [],
    },
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
        <NewsDetailContent item={item} />
        {related.length > 0 && (
          <section className="py-10 border-t border-line">
            <h2 className="font-serif font-bold text-xl mb-5"><Trans k="otherNews" /></h2>
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
