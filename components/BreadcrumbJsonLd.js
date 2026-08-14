// Google-ისთვის სტრუქტურული breadcrumb მონაცემი (JSON-LD).
// items: [{ name: "მთავარი", url: "https://..." }, { name: "სიახლეები", url: "..." }, ...]
export default function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
