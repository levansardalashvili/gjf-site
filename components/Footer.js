"use client";
import { useState } from "react";
import Image from "next/image";
import { NAV } from "@/lib/nav";

const BELT_COLORS = ["#f4f1ea", "#f3c94f", "#e07a2c", "#4a8f4a", "#2c5aa6", "#6b4226", "#14171c"];

export default function Footer() {
  const [expanded, setExpanded] = useState(null);

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
                საქართველოს<br />ძიუდოს ფედერაცია
              </span>
            </div>
            <p className="text-sm opacity-55 leading-relaxed max-w-xs">
              ოფიციალური საიტი — სიახლეები, შედეგები და ეროვნული ნაკრების ცხოვრება.
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
                    {item.label}
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
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-line flex justify-between items-center flex-wrap gap-2 text-xs opacity-45">
          <span>© {new Date().getFullYear()} საქართველოს ძიუდოს ფედერაცია</span>
          <span className="text-gold/70">ძიუდო · ძალა · პატივისცემა</span>
        </div>
      </div>
    </footer>
  );
}
