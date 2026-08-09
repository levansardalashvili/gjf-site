import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ slug, title, image_url, excerpt, fixedWidth = false }) {
  return (
    <Link
      href={`/federation/projects/${slug}`}
      className={`block bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
        fixedWidth ? "shrink-0 w-[260px] md:w-[280px]" : "w-full"
      }`}
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2a2f38] to-[#1a1d23]">
        {image_url && <Image src={image_url} alt={title} fill className="object-cover" />}
      </div>
      <div className="p-4 pb-5">
        <h3 className="font-sans font-semibold leading-snug text-sm line-clamp-2">{title}</h3>
        {excerpt && <p className="text-xs opacity-55 mt-2 line-clamp-2">{excerpt}</p>}
      </div>
    </Link>
  );
}
