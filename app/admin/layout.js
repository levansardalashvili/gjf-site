"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// ზუსტად საიტის ნავიგაციის მენიუს იმეორებს — "ფედერაცია" და "ნაკრები" ქარდებად
// იშლება (რადგან რამდენიმე განსხვავებულ რამეს მოიცავს), დანარჩენი პირდაპირ სიაზე გადადის.
const LINKS = [
  { href: "/admin", label: "მთავარი" },
  { href: "/admin/federation", label: "ფედერაცია" },
  { href: "/admin/news", label: "სიახლეები" },
  { href: "/admin/teams", label: "ნაკრები" },
  { href: "/admin/events", label: "კალენდარი" },
  { href: "/admin/results", label: "შედეგები" },
  { href: "/admin/gallery", label: "გალერეა" },
  { href: "/admin/history", label: "ისტორია" },
  { href: "/admin/contact", label: "კონტაქტი" },
];

// ეს არ არის საიტის მთავარ მენიუში, მაგრამ მაინც საჭიროა admin-იდან სამართავად
const EXTRA_LINKS = [{ href: "/admin/partners", label: "პარტნიორები" }];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return children;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-56 shrink-0 bg-ink-2 border-b md:border-b-0 md:border-r border-line p-5 flex md:flex-col justify-between md:justify-start gap-4">
        <div>
          <div className="flex items-center gap-2.5 font-serif font-bold mb-6">
            <span className="w-8 h-8 rounded-md bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center font-black text-sm">ჯ</span>
            Admin
          </div>
          <nav className="flex md:flex-col gap-1 flex-wrap">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(l.href) ? "bg-crimson" : "opacity-70 hover:opacity-100 hover:bg-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 pt-5 border-t border-line hidden md:block">
            <div className="text-xs uppercase tracking-wide opacity-40 mb-2 px-3">სხვა</div>
            <nav className="flex md:flex-col gap-1">
              {EXTRA_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive(l.href) ? "bg-crimson" : "opacity-70 hover:opacity-100 hover:bg-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <button onClick={handleLogout} className="text-sm opacity-60 hover:opacity-100 text-left">
          გასვლა →
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
