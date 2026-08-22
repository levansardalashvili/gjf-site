import Image from "next/image";

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
              <div className={`relative shrink-0 w-20 h-16 rounded-xl ${bgClass[l.logo_bg] || ""}`}>
                <Image src={l.logo_url} alt={l.title} fill className="object-contain p-3" />
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
