import Link from "next/link";

export default function EventRow({ slug, day, month, tag, title, location }) {
  return (
    <Link
      href={`/calendar/${slug}`}
      className="group relative flex items-center gap-4 py-[18px] border-b border-line hover:bg-ink-2/50 transition-all duration-300 -mx-2 px-2 rounded-lg overflow-hidden"
    >
      {/* მარცხენა ოქროსფერი ხაზი, რომელიც hover-ზე იზრდება */}
      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />

      <div className="w-[58px] text-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <div className="font-serif font-bold text-2xl text-gold">{day}</div>
        <div className="text-[0.68rem] opacity-60 uppercase">{month}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-crimson font-bold uppercase tracking-wide">{tag}</div>
        <h4 className="text-[0.98rem] font-semibold mt-0.5 transition-colors duration-300 group-hover:text-gold">
          {title}
        </h4>
        <div className="text-sm opacity-55 mt-0.5">{location}</div>
      </div>
      <div className="opacity-40 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-70">→</div>
    </Link>
  );
}
