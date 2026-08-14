"use client";
import { useState } from "react";
import Icon from "./Icon";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs uppercase tracking-wide opacity-50 font-bold mr-1">გაზიარება</span>
      <a
        href={fbUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook-ზე გაზიარება"
        className="w-9 h-9 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
      >
        <Icon name="facebook" size={15} />
      </a>
      <a
        href={xUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="X-ზე გაზიარება"
        className="w-9 h-9 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.7l-5.2-6.8L5.6 22H2.4l8.1-9.3L1.7 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
        </svg>
      </a>
      <button
        onClick={handleCopy}
        aria-label="ბმულის კოპირება"
        className="w-9 h-9 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
      >
        {copied ? <Icon name="check" size={15} /> : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
            <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
          </svg>
        )}
      </button>
      {copied && <span className="text-xs text-gold font-semibold">დაკოპირდა!</span>}
    </div>
  );
}
