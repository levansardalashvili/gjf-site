"use client";
import { useState } from "react";
import Image from "next/image";
import { NAV } from "@/lib/nav";
import { useLanguage } from "@/lib/i18n";

const BELT_COLORS = ["#f4f1ea", "#f3c94f", "#e07a2c", "#4a8f4a", "#2c5aa6", "#6b4226", "#14171c"];

export default function Footer() {
  const [expanded, setExpanded] = useState(null);
  const { lang, t } = useLanguage();

  function toggle(href) {
    setExpanded((cur) => (cur === href ? null : href));
  }

  return (
    <footer id="contact" className="bg-ink-2 border-t border-line mt-5">
      {/* ქამრის ზოლი — ბრენდის ხელმოწერითი დეტალი */}
      <div className="flex w-full h-1">
        {BELT_COLORS.map((c, i) => (
          <span key={i} style={{ background: c }} className="flex-1" />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-5 pt-12 pb-8">
        <div className="grid gap-10 lg:gap-8 grid-cols-1 lg:grid-cols-[1.3fr_2fr]">
          {/* ბრენდის ბლოკი */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="საქართველოს ძიუდოს ფედერაცია" width={99} height={125} className="h-10 w-auto" />
              <span className="font-serif font-bold text-base leading-tight">
                {lang === "ka" ? (<>საქართველოს<br />ძიუდოს ფედერაცია</>) : (<>Georgian<br />Judo Federation</>)}
              </span>
            </div>
            <p className="text-sm opacity-55 leading-relaxed max-w-xs">
              {t("officialSite")}
            </p>
          </div>

          {/* ნავიგაციის ბლოკები */}
          <div className="columns-2 sm:columns-3 gap-x-6">
            {NAV.map((item) => (
              <div key={item.href} className="break-inside-avoid mb-5">
                <div className="flex items-center justify-between border-b border-line/60 sm:border-b-0">
                  <a
                    href={item.href}
                    className="block font-bold text-sm py-2.5 sm:py-0 sm:mb-2.5 hover:text-gold transition-colors"
                  >
                    {item.label[lang]}
                  </a>
                  {item.children && (
                    <button
                      onClick={() => toggle(item.href)}
                      className="sm:hidden p-2.5 opacity-50"
                      aria-label="ქვემენიუს გახსნა"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 10 10"
                        className={`transition-transform duration-300 ${expanded === item.href ? "rotate-180" : ""}`}
                      >
                        <path d="M1 3 L5 7 L9 3" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      </svg>
                    </button>
                  )}
                </div>

                {item.children && (
                  <div className={`${expanded === item.href ? "block" : "hidden"} sm:block pb-2 sm:pb-0`}>
                    {item.children.map((c) => (
                      <a
                        key={c.href}
                        href={c.href}
                        className="block text-[0.85rem] py-1 opacity-55 hover:opacity-100 hover:text-gold transition-all"
                      >
                        {c.label[lang]}
                      </a>
                    ))}
                  </div>
                )}

                {item.href === "/contact" && (
                  <div className="flex gap-3 mt-3">
                    <a
                      href="https://www.facebook.com/GeorgianJudoFederation"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.77 8.44-4.94 8.44-9.94Z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/georgianjudofederation/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/GeorgiaJudo"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="w-9 h-9 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 12s0-3.6-.46-5.3a3 3 0 0 0-2.1-2.1C18.7 4 12 4 12 4s-6.7 0-8.44.6a3 3 0 0 0-2.1 2.1C1 8.4 1 12 1 12s0 3.6.46 5.3a3 3 0 0 0 2.1 2.1C5.3 20 12 20 12 20s6.7 0 8.44-.6a3 3 0 0 0 2.1-2.1C23 15.6 23 12 23 12Z" opacity=".18"/>
                        <path d="M9.75 15.5V8.5L15.75 12l-6 3.5Z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-line flex justify-between items-center flex-wrap gap-2 text-xs opacity-45">
          <span>© {new Date().getFullYear()} {t("rightsReserved")}</span>
        </div>
      </div>
    </footer>
  );
}
