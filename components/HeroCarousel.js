"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const INTERVAL_MS = 5000;

export default function HeroCarousel({ news, fullBleed = false, showThumbnails = false }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (news.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % news.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [news.length, paused]);

  if (news.length === 0) return null;

  function goPrev() {
    setActive((i) => (i - 1 + news.length) % news.length);
  }
  function goNext() {
    setActive((i) => (i + 1) % news.length);
  }

  const containerClass = fullBleed
    ? "relative overflow-hidden h-[520px] md:h-[640px] w-full"
    : "relative rounded-3xl overflow-hidden border border-line h-[520px] md:h-[640px]";

  return (
    <div>
      <div
        className={containerClass}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
      {news.map((item, i) => (
        <div
          key={item.slug}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              priority={i === 0}
              className={`object-cover ${i === active ? "ken-burns" : ""}`}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]" />
          )}
          {/* კითხვადობისთვის ბნელი გრადიენტი ტექსტის ქვეშ */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171c] via-[#14171c]/40 to-transparent" />

          <a
            href={item.external_url ? item.external_url : `/news/${item.slug}`}
            target={item.external_url ? "_blank" : undefined}
            rel={item.external_url ? "noreferrer" : undefined}
            className="absolute inset-0 flex flex-col justify-end"
          >
            <div className="w-full px-5 md:px-8 pb-10 md:pb-14">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5 mb-3">
                  {item.isLive && (
                    <span className="flex items-center gap-1.5 bg-crimson text-white text-xs font-extrabold px-2.5 py-1 rounded-full uppercase">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      ლაივი
                    </span>
                  )}
                  {item.medal && (
                    <span className="bg-gold text-white text-xs font-extrabold px-2.5 py-1 rounded-full">{item.medal}</span>
                  )}
                  <span className="text-xs uppercase tracking-widest text-white font-bold">{item.date}</span>
                </div>
                <h2 className="font-serif font-bold text-2xl md:text-4xl leading-tight text-[#faf7f0]">
                  {item.title}
                </h2>
              </div>
            </div>
          </a>
        </div>
      ))}

      {news.length > 1 && !showThumbnails && (
        <>
          <button
            onClick={goPrev}
            aria-label="წინა სიახლე"
            className="absolute left-4 md:left-7 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#14171c]/50 hover:bg-[#14171c]/75 hover:scale-110 border border-[#faf7f0]/20 flex items-center justify-center text-[#faf7f0] backdrop-blur-sm transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={goNext}
            aria-label="შემდეგი სიახლე"
            className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#14171c]/50 hover:bg-[#14171c]/75 hover:scale-110 border border-[#faf7f0]/20 flex items-center justify-center text-[#faf7f0] backdrop-blur-sm transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      )}

      {news.length > 1 && !showThumbnails && (
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex justify-end gap-2">
            {news.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => setActive(i)}
                aria-label={`სიახლე ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-7 bg-gold" : "w-1.5 bg-[#faf7f0]/40 hover:bg-[#faf7f0]/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      </div>

      {/* თამბნეილების ზოლი — მთავარი ეკრანის ქვემოთ, ისრებით */}
      {showThumbnails && news.length > 1 && (
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={goPrev}
            aria-label="წინა სიახლე"
            className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div className="flex-1 grid grid-cols-4 gap-2.5">
            {news.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => setActive(i)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  i === active ? "border-gold" : "border-line opacity-60 hover:opacity-100"
                }`}
              >
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.title} fill sizes="(max-width: 640px) 25vw, 200px" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="შემდეგი სიახლე"
            className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
