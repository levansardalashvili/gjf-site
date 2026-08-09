import { getAllNews, getAllEvents, getAllClubs, getAllTeamMembers, getAllPages, getAllProjects, getAllPartners, getAllResults, getAllGalleryItems } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminDashboard() {
  const [news, events, clubs, members, pages, projects, partners, results, gallery] = await Promise.all([
    getAllNews(), getAllEvents(), getAllClubs(), getAllTeamMembers(), getAllPages(), getAllProjects(), getAllPartners(), getAllResults(), getAllGalleryItems(),
  ]);

  const federationCount = pages.filter((p) => p.slug.startsWith("federation-")).length;
  const historyCount = pages.filter((p) => p.slug.startsWith("judo-")).length;
  const contactCount = pages.filter((p) => p.slug.startsWith("contact-")).length;

  const cards = [
    { label: "სიახლე", count: news.length, href: "/admin/news" },
    { label: "კალენდარში", count: events.length, href: "/admin/events" },
    { label: "შედეგი", count: results.length, href: "/admin/results" },
    { label: "ნაკრების წევრი", count: members.length, href: "/admin/team-members" },
    { label: "ფედერაციის გვერდი", count: federationCount, href: "/admin/federation" },
    { label: "კლუბი", count: clubs.length, href: "/admin/clubs" },
    { label: "პროექტი", count: projects.length, href: "/admin/projects" },
    { label: "ისტორიის გვერდი", count: historyCount, href: "/admin/history" },
    { label: "პარტნიორი", count: partners.length, href: "/admin/partners" },
    { label: "გალერეის ჩანაწერი", count: gallery.length, href: "/admin/gallery" },
    { label: "საკონტაქტო ველი", count: contactCount, href: "/admin/contact" },
  ];

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">მთავარი</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <a key={c.href} href={c.href} className="bg-ink-2 border border-line rounded-2xl p-6 hover:border-gold/50 transition-colors">
            <div className="font-serif font-bold text-3xl text-gold mb-1">{c.count}</div>
            <div className="text-sm opacity-70">{c.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
