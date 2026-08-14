import { getAllNews } from "@/lib/queries";
import { stripHtml } from "@/lib/stripHtml";

export const revalidate = 3600; // 1 საათში ერთხელ ახლდება

function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";
  const news = await getAllNews();
  const latest = news.slice(0, 30);

  const items = latest
    .map((n) => {
      const url = `${baseUrl}/news/${n.slug}`;
      const description = stripHtml(n.body)?.slice(0, 300) || "";
      return `
    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      ${n.image_url ? `<enclosure url="${escapeXml(n.image_url)}" type="image/jpeg" />` : ""}
      <pubDate>${new Date(n.created_at || Date.now()).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>საქართველოს ძიუდოს ფედერაცია — სიახლეები</title>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>საქართველოს ძიუდოს ფედერაციის ოფიციალური სიახლეები</description>
    <language>ka</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
