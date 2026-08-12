"use client";
import Icon from "@/components/Icon";
import SocialLinkForm from "./SocialLinkForm";
import DeleteButton from "./DeleteButton";

export default function SocialLinksManager({ links }) {
  return (
    <div className="bg-ink-2 border border-line rounded-2xl p-5 mb-6">
      <h2 className="font-serif font-bold text-lg mb-1">სოც. ქსელები</h2>
      <p className="text-xs opacity-55 mb-4">/contact გვერდზე აიქონებად ჩანს — დამატება/წაშლა.</p>

      <div className="flex flex-col gap-2 mb-5">
        {links.map((l) => (
          <div key={l.id} className="flex items-center gap-3 bg-ink border border-line rounded-lg px-3.5 py-2.5">
            <Icon name={l.platform} size={16} className="text-gold shrink-0" />
            <span className="text-sm capitalize shrink-0 w-20">{l.platform}</span>
            <a href={l.url} target="_blank" rel="noreferrer" className="text-sm text-gold truncate flex-1">
              {l.url}
            </a>
            <DeleteButton endpoint={`/api/social-links/${l.id}`} confirmText={`"${l.platform}" ბმული წაიშლება.`} />
          </div>
        ))}
        {links.length === 0 && <p className="text-sm opacity-50">ბმული ჯერ არ არის დამატებული.</p>}
      </div>

      <SocialLinkForm />
    </div>
  );
}
