"use client";
import { useLanguage } from "@/lib/i18n";

const LINKS = [
  {
    href: "https://portal.judomanager.com/gjf",
    titleKey: "resultsPortal",
    descKey: "resultsPortalDesc",
    logo: "/logos/jm-portal-black.svg",
    logoBg: "bg-white border border-line",
    logoClass: "h-5 md:h-6 w-auto",
  },
  {
    href: "https://admin.judomanager.com/login",
    titleKey: "registrationAdmin",
    descKey: "registrationAdminDesc",
    logo: "/logos/jm-account-white.svg",
    logoBg: "bg-crimson-dark",
    logoClass: "h-7 md:h-8 w-auto",
  },
  {
    href: "https://www.youtube.com/GeorgiaJudo",
    titleKey: "mediaPortal",
    descKey: "mediaPortalDesc",
    logo: "/logos/youtube-icon.svg",
    logoBg: null,
    logoClass: "h-10 md:h-12 w-auto",
  },
];

export default function PortalLinks() {
  const { t } = useLanguage();

  return (
    <div className="w-full border-y border-line bg-ink-2">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 px-6 py-8 hover:bg-ink/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div
              className={`shrink-0 w-20 h-16 rounded-xl flex items-center justify-center px-3 ${
                l.logoBg || ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.logo} alt={t(l.titleKey)} className={l.logoClass} />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-base mb-1">{t(l.titleKey)}</h3>
              <p className="text-sm opacity-60 leading-snug">{t(l.descKey)}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
