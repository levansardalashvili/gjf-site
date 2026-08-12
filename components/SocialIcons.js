import Icon from "./Icon";

export default function SocialIcons({ links, size = 18 }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex gap-3">
      {links.map((l) => (
        <a
          key={l.id}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          aria-label={l.platform}
          className="w-10 h-10 rounded-full border border-line flex items-center justify-center opacity-70 hover:opacity-100 hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
        >
          <Icon name={l.platform} size={size} />
        </a>
      ))}
    </div>
  );
}
