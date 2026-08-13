export default function PortalLinks({ links }) {
  if (!links || links.length === 0) return null;

  const bgClass = { white: "bg-white border border-line", dark: "bg-crimson-dark", none: "" };

  return (
    <div className="w-full border-y border-line bg-ink-2">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
        {links.map((l) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 px-6 py-8 hover:bg-ink/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            {l.logo_url && (
              <div className={`shrink-0 w-20 h-16 rounded-xl flex items-center justify-center p-3 ${bgClass[l.logo_bg] || ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.logo_url} alt={l.title} className="max-h-10 md:max-h-12 w-auto object-contain" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-base mb-1">{l.title}</h3>
              {l.description && <p className="text-sm opacity-60 leading-snug">{l.description}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
