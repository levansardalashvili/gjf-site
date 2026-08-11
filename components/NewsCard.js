import Link from "next/link";
import Image from "next/image";

export default function NewsCard({ slug, date, title, medal, image_url }) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group flex flex-col h-full bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2a2f38] to-[#1a1d23] shrink-0">
        {image_url && <Image src={image_url} alt={title} fill className="object-cover" />}
        {medal && (
          <span className="absolute top-3 left-3 bg-gold text-[#14171c] text-xs font-extrabold px-2.5 py-1 rounded-full z-10">
            {medal}
          </span>
        )}
      </div>
      <div className="p-4 pb-5 flex flex-col flex-1">
        <div className="text-xs opacity-55 mb-2 uppercase tracking-wide">{date}</div>
        <h3 className="font-sans font-semibold leading-snug text-base line-clamp-2">{title}</h3>
        <div className="flex-1" />
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gold mt-4">
          სრულად ნახვა
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
