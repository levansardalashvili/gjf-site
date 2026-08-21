// Google-ისთვის სტრუქტურული მონაცემი — "ეს არის სიახლის სტატია" (თარიღით, ავტორით, ფოტოთი)
export default function ArticleJsonLd({ title, description, imageUrl, datePublished, url }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    ...(description ? { description } : {}),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    ...(datePublished ? { datePublished } : {}),
    author: { "@type": "Organization", name: "საქართველოს ძიუდოს ფედერაცია" },
    publisher: {
      "@type": "Organization",
      name: "საქართველოს ძიუდოს ფედერაცია",
      logo: { "@type": "ImageObject", url: `${new URL(url).origin}/logo.png` },
    },
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
