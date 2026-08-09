import Link from "next/link";
import Image from "next/image";

export default function NewsCard({ slug, date, title, medal, featured = false, image_url }) {
  return (
    <Link
      href={`/news/${slug}`}
      className="block bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`relative bg-gradient-to-br from-[#2a2f38] to-[#1a1d23] ${
          featured ? "aspect-[16/11]" : "aspect-[16/10]"
        }`}
      >
        {image_url && <Image src={image_url} alt={title} fill className="object-cover" />}
        {medal && (
          <span className="absolute top-3 left-3 bg-gold text-ink text-xs font-extrabold px-2.5 py-1 rounded-full z-10">
            {medal}
          </span>
        )}
      </div>
      <div className="p-4 pb-5">
        <div className="text-xs opacity-55 mb-2 uppercase tracking-wide">{date}</div>
        <h3 className={`font-sans font-semibold leading-snug ${featured ? "text-xl" : "text-base"}`}>
          {title}
        </h3>
      </div>
    </Link>
  );
}
