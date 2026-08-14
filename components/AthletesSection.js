"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function AthletesSection({ athletes }) {
  const { lang } = useLanguage();
  if (!athletes || athletes.length === 0) return null;

  const title = lang === "en" ? "Our Athletes" : "ჩვენი სპორტსმენები";

  return (
    <div className="w-full py-16 border-t border-line">
      <div className="max-w-[1400px] mx-auto px-5">
        <h2 className="font-serif font-bold text-2xl mb-6">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {athletes.map((a) => (
            <Link
              key={a.id}
              href={`/teams/athlete/${a.slug}`}
              className="group shrink-0 w-[150px] bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image src={a.photo_url} alt={a.name} fill sizes="150px" className="object-cover" />
              </div>
              <div className="p-3">
                <div className="text-xs text-crimson font-bold mb-0.5">{a.weight}</div>
                <div className="font-semibold text-sm leading-snug group-hover:text-gold transition-colors line-clamp-2">
                  {a.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
