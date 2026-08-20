"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BeltDivider from "./BeltDivider";
import { NAV } from "@/lib/nav";
import { useLanguage } from "@/lib/i18n";
import Icon from "./Icon";
import SearchModal from "./SearchModal";

function LanguageSwitcher({ lang, setLang, className = "" }) {
  const isKa = lang === "ka";
  return (
    <button
      onClick={() => setLang(isKa ? "en" : "ka")}
      className={`inline-flex items-center justify-center w-[58px] h-[30px] px-1 rounded-md border border-line text-xs font-bold leading-none hover:border-gold hover:text-gold transition-colors normal-case shrink-0 ${className}`}
      aria-label={isKa ? "Switch to English" : "ქართულზე გადართვა"}
    >
      {isKa ? "ENG" : "ქართ"}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState(null); // mobile accordion state
  const { lang, setLang } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-line">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6 px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/logo.png" alt="საქართველოს ძიუდოს ფედერაცია" width={99} height={125} className="h-9 w-auto" priority />
            <span className="hidden sm:block text-xs md:text-sm font-semibold leading-tight whitespace-nowrap">
              საქართველოს ძიუდოს ფედერაცია
            </span>
          </Link>

          {/* Desktop nav — hover-dropdown */}
          <nav className="hidden lg:flex items-center gap-3 text-sm font-semibold uppercase opacity-90">
            {NAV.map((item) => (
              <div key={item.href} className="relative group">
                <Link href={item.href} className="flex items-center gap-1 py-2 hover:text-gold">
                  {item.label[lang]}
                  {item.children && (
                    <svg width="9" height="9" viewBox="0 0 10 10" className="opacity-60 mt-px">
                      <path d="M1 3 L5 7 L9 3" stroke="currentColor" strokeWidth="1.4" fill="none" />
                    </svg>
                  )}
                </Link>

                {item.children && (
                  <div
                    className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1
                               group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                               transition-all duration-150 z-50"
                  >
                    <div className="bg-ink-2 border border-line rounded-xl shadow-xl py-2 min-w-[220px] normal-case">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block px-4 py-2.5 text-sm font-medium tracking-normal hover:bg-ink hover:text-gold"
                        >
                          {c.label[lang]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="w-px h-5 bg-line mx-2 shrink-0" />
            <button
              onClick={() => setSearchOpen(true)}
              className="opacity-70 hover:opacity-100 hover:text-gold transition-colors normal-case shrink-0"
              aria-label="ძებნა"
            >
              <Icon name="search" size={18} />
            </button>
            <LanguageSwitcher lang={lang} setLang={setLang} className="ml-2" />
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-[38px] h-[38px] border border-line rounded-lg flex items-center justify-center shrink-0"
              aria-label="ძებნა"
            >
              <Icon name="search" size={17} />
            </button>
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <button
              onClick={() => setOpen(true)}
              className="w-[38px] h-[38px] border border-line rounded-lg flex items-center justify-center shrink-0"
              aria-label="მენიუს გახსნა"
            >
              <div className="relative w-4 h-px bg-offwhite before:content-[''] before:absolute before:left-0 before:-top-1.5 before:w-4 before:h-px before:bg-offwhite after:content-[''] after:absolute after:left-0 after:top-1.5 after:w-4 after:h-px after:bg-offwhite" />
            </button>
          </div>
        </div>
      </header>
      <BeltDivider />

      {/* Mobile drawer — accordion for children */}
      <div
        className={`fixed inset-0 z-[100] bg-ink-2 p-6 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Image src="/logo.png" alt="საქართველოს ძიუდოს ფედერაცია" width={99} height={125} className="h-8 w-auto" />
          <button
            onClick={() => setOpen(false)}
            className="w-[38px] h-[38px] border border-line rounded-lg flex items-center justify-center"
            aria-label="დახურვა"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {NAV.map((item) => (
          <div key={item.href} className="border-b border-line">
            <div className="flex items-center justify-between">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex-1 py-3.5 text-lg font-semibold"
              >
                {item.label[lang]}
              </Link>
              {item.children && (
                <button
                  onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                  className="p-3.5 opacity-60"
                  aria-label="ქვემენიუს გახსნა"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 10 10"
                    className={`transition-transform ${expanded === item.href ? "rotate-180" : ""}`}
                  >
                    <path d="M1 3 L5 7 L9 3" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  </svg>
                </button>
              )}
            </div>
            {item.children && expanded === item.href && (
              <div className="pb-3 pl-3">
                {item.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm opacity-75"
                  >
                    {c.label[lang]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
