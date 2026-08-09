const LINKS = [
  { href: "/teams/staff", title: "მწვრთნელთა შტაბი" },
  { href: "/teams/standart", title: "ვაჟების ნაკრები" },
  { href: "/teams/women", title: "ქალების ნაკრები" },
];

export default function NationalTeamLinks() {
  return (
    <div className="w-full py-16">
      <div className="max-w-[1400px] mx-auto px-5">
        <h2 className="font-serif font-bold text-2xl mb-6">ეროვნული ნაკრები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center justify-between gap-3 bg-ink-2 border border-line rounded-2xl px-6 py-6 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <span className="font-semibold">{l.title}</span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-gold shrink-0">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
