import { getAllNews, getAllEvents, getAllClubs, getAllTeamMembers, getAllPages, getAllProjects, getAllPartners, getAllResults, getAllGalleryItems } from "@/lib/queries";
import Icon from "@/components/Icon";

export const revalidate = 0;

const ICONS = {
  news: "scroll", events: "calendar", results: "trophy", members: "judo", federation: "federation",
  clubs: "building", projects: "rocket", history: "scroll", partners: "handshake", gallery: "gallery", contact: "mail",
};

export default async function AdminDashboard() {
  const [news, events, clubs, members, pages, projects, partners, results, gallery] = await Promise.all([
    getAllNews(), getAllEvents(), getAllClubs(), getAllTeamMembers(), getAllPages(), getAllProjects(), getAllPartners(), getAllResults(), getAllGalleryItems(),
  ]);

  const federationCount = pages.filter((p) => p.slug.startsWith("federation-")).length;
  const historyCount = pages.filter((p) => p.slug.startsWith("judo-")).length;
  const contactCount = pages.filter((p) => p.slug.startsWith("contact-")).length;

  const cards = [
    { key: "news", label: "სიახლე", count: news.length, href: "/admin/news", addHref: "/admin/news/new" },
    { key: "events", label: "კალენდარში", count: events.length, href: "/admin/events" },
    { key: "results", label: "შედეგი", count: results.length, href: "/admin/results" },
    { key: "members", label: "ნაკრების წევრი", count: members.length, href: "/admin/team-members" },
    { key: "federation", label: "ფედერაციის გვერდი", count: federationCount, href: "/admin/federation" },
    { key: "clubs", label: "კლუბი", count: clubs.length, href: "/admin/clubs", addHref: "/admin/clubs/new" },
    { key: "projects", label: "პროექტი", count: projects.length, href: "/admin/projects", addHref: "/admin/projects/new" },
    { key: "history", label: "ისტორიის გვერდი", count: historyCount, href: "/admin/history" },
    { key: "partners", label: "პარტნიორი", count: partners.length, href: "/admin/partners", addHref: "/admin/partners/new" },
    { key: "gallery", label: "გალერეის ჩანაწერი", count: gallery.length, href: "/admin/gallery", addHref: "/admin/gallery/new" },
    { key: "contact", label: "საკონტაქტო ველი", count: contactCount, href: "/admin/contact" },
  ];

  const totalItems = news.length + events.length + results.length + members.length + clubs.length + projects.length + partners.length + gallery.length;

  const today = new Date().toLocaleDateString("ka-GE", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm opacity-50 mb-1 capitalize">{today}</p>
        <h1 className="font-serif font-bold text-2xl">მთავარი</h1>
        <p className="text-sm opacity-60 mt-1">სულ {totalItems} ჩანაწერია საიტზე, {cards.length} სექციაში</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.href}
            className="group bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            <a href={c.href} className="flex items-start justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-lg">
                <Icon name={ICONS[c.key]} size={19} className="text-gold" />
              </span>
              <span className="font-serif font-bold text-2xl text-gold">{c.count}</span>
            </a>
            <a href={c.href} className="block text-sm font-semibold mb-3 group-hover:text-gold transition-colors">
              {c.label}
            </a>
            <div className="flex items-center gap-3 text-xs">
              <a href={c.href} className="opacity-60 hover:opacity-100 transition-opacity">სია →</a>
              {c.addHref && (
                <a href={c.addHref} className="text-gold font-semibold hover:opacity-80 transition-opacity">+ დამატება</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
