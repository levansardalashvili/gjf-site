import { getAllNews, getNewsBySlug } from "@/lib/queries";
import { getServerLang } from "@/lib/getServerLang";
import { stripHtml } from "@/lib/stripHtml";
import NewsCard from "@/components/NewsCard";
import NewsDetailContent from "@/components/NewsDetailContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import Trans from "@/components/Trans";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) return {};
  const lang = getServerLang();
  const title = (lang === "en" && item.title_en) ? item.title_en : item.title;
  const body = (lang === "en" && item.body_en) ? item.body_en : item.body;
  return {
    title,
    description: stripHtml(body)?.slice(0, 160),
    openGraph: {
      title,
      description: stripHtml(body)?.slice(0, 160),
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
  const articleUrl = `${SITE_URL}/news/${item.slug}`;
  const lang = getServerLang();
  const title = (lang === "en" && item.title_en) ? item.title_en : item.title;
  const body = (lang === "en" && item.body_en) ? item.body_en : item.body;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: lang === "en" ? "Home" : "მთავარი", url: SITE_URL },
          { name: lang === "en" ? "News" : "სიახლეები", url: `${SITE_URL}/news` },
          { name: title, url: articleUrl },
        ]}
      />
      <ArticleJsonLd
        title={title}
        description={stripHtml(body)?.slice(0, 300)}
        imageUrl={item.image_url}
        datePublished={item.created_at}
        url={articleUrl}
      />
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
    </>
  );
}
