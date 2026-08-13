"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function AlbumGallery({ photos }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-16">
        {photos.map((p, i) => (
          <Reveal key={p.id} delay={Math.min((i % 5) + 1, 5)}>
            <button
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full aspect-square rounded-lg overflow-hidden border border-line hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              <Image src={p.image_url} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox photos={photos} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}
