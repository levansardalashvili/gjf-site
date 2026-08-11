import Link from "next/link";
import { getPageBySlug } from "@/lib/queries";

export const revalidate = 0;

export default async function AdminFederationPage() {
  const statutePage = await getPageBySlug("federation-statute");

  const CARDS = [
    { href: "/admin/staff", title: "შემადგენლობა" },
    { href: "/admin/committee", title: "აღმასკომი" },
    { href: "/admin/regulations", title: "დებულებები" },
    { href: "/admin/structure", title: "სტრუქტურა" },
    { href: statutePage ? `/admin/pages/${statutePage.id}` : "/admin/pages", title: "წესდება" },
    { href: "/admin/commissions", title: "კომისიები" },
    { href: "/admin/regions", title: "რეგიონები" },
    { href: "/admin/clubs", title: "კლუბები" },
    { href: "/admin/projects", title: "პროექტები" },
  ];

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ფედერაცია</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {CARDS.map((c) => (
          <Link key={c.title} href={c.href} className="bg-ink-2 border border-line rounded-2xl p-5 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <h3 className="font-serif font-bold text-lg mb-1">{c.title}</h3>
            <p className="text-sm opacity-60">დამატება, რედაქტირება, წაშლა →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
