"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Icon from "./Icon";

export default function Lightbox({ photos, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);

  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[400] bg-black/95 modal-fade flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors z-10"
        aria-label="დახურვა"
      >
        <Icon name="close" size={18} />
      </button>

      <div className="absolute top-5 left-5 text-white/70 text-sm z-10">
        {index + 1} / {photos.length}
      </div>

      {photos.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          aria-label="წინა ფოტო"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}

      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-auto my-auto px-16">
        <Image src={photo.image_url} alt="" fill className="object-contain" priority />
      </div>

      {photos.length > 1 && (
        <button
          onClick={next}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          aria-label="შემდეგი ფოტო"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
    </div>
  );
}
