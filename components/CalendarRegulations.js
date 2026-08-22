import { renderRichHtml } from "@/lib/richHtml";
import Reveal from "./Reveal";
import Icon from "./Icon";
import { stripHtml } from "@/lib/stripHtml";

export default function CalendarRegulations({ items }) {
  if (items.length === 0) return null;

  const notices = items.filter((r) => r.body);
  const docs = items.filter((r) => !r.body);

  return (
    <div className="w-full py-14 border-t border-line">
      <h2 className="font-serif font-bold text-2xl mb-6">ფედერაციის დებულებები</h2>

      {notices.map((r) => (
        <Reveal key={r.id} className="mb-6">
          <div className="bg-crimson/10 border border-crimson/40 rounded-2xl p-6">
            <h3 className="font-serif font-bold text-lg text-gold mb-3 flex items-center gap-2"><Icon name="warning" size={19} />{r.title}</h3>
            <div className="text-sm leading-relaxed opacity-90 mb-4 rich-content" dangerouslySetInnerHTML={{ __html: renderRichHtml(r.body) }} />
            {r.file_url && (
              <a
                href={r.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-crimson text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-crimson-dark transition-colors"
              >
                <Icon name="document" size={16} />
                {r.file_name || "დოკუმენტის ნახვა"}
              </a>
            )}
          </div>
        </Reveal>
      ))}

      {docs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {docs.map((r, i) => (
            <Reveal key={r.id} delay={Math.min(i + 1, 5)}>
              <a
                href={r.file_url || "#"}
                target={r.force_download ? undefined : "_blank"}
                rel="noreferrer"
                download={r.force_download ? (r.file_name || true) : undefined}
                className="block bg-ink-2 border border-line rounded-2xl p-5 h-full hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold flex items-center justify-center mb-4">
                  <Icon name={r.force_download ? "download" : "document"} size={18} />
                </div>
                <h3 className="font-serif font-bold text-base leading-snug mb-2">{r.title}</h3>
                {r.excerpt && <p className="text-sm opacity-60 leading-relaxed">{stripHtml(r.excerpt)}</p>}
                <span className="inline-block text-sm font-bold text-gold mt-3">
                  {r.force_download ? "ჩამოტვირთვა →" : "ნახვა →"}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
