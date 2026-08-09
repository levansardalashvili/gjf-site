export default function ClubRow({ name, location, members }) {
  return (
    <div className="flex items-center gap-3.5 py-3.5 px-4 bg-ink-2 border border-line rounded-xl">
      <div className="w-11 h-11 rounded-lg bg-gold/20 text-gold font-extrabold flex items-center justify-center flex-shrink-0">
        ჯ
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold">{name}</h4>
        <div className="text-sm opacity-55 mt-0.5">{location}</div>
      </div>
      <div className="text-xs opacity-50 flex-shrink-0">{members} წევრი</div>
    </div>
  );
}
