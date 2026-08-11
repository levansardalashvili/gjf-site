import Reveal from "./Reveal";

export default function OrgChart({ nodes }) {
  const spine = nodes.filter((n) => n.row_order !== null).sort((a, b) => a.row_order - b.row_order);
  const branchesByRow = {};
  nodes
    .filter((n) => n.row_order === null)
    .forEach((n) => {
      if (!branchesByRow[n.attach_to_row]) branchesByRow[n.attach_to_row] = [];
      branchesByRow[n.attach_to_row].push(n);
    });
  Object.values(branchesByRow).forEach((arr) => arr.sort((a, b) => a.sort_order - b.sort_order));

  if (spine.length === 0) return null;

  return (
    <div className="border-l-2 border-line ml-3 md:ml-4">
      {spine.map((node, i) => {
        const branches = branchesByRow[node.row_order] || [];
        return (
          <Reveal key={node.id} delay={Math.min(i + 1, 5)} className="relative -ml-3 md:-ml-4 pb-6 last:pb-0">
            <div className="flex items-start gap-3 md:gap-4 flex-wrap">
              {/* ჰორიზონტალური ხაზი მთავარი ხაზიდან ყუთამდე */}
              <div className="w-3 md:w-4 h-px bg-line mt-8 shrink-0" />

              {/* მთავარი ხაზის ყუთი */}
              <div className="bg-ink-2 border-2 border-gold/40 rounded-xl px-4 py-3 min-w-[160px] hover:border-gold/70 hover:-translate-y-0.5 transition-all duration-300 shadow-lg">
                <div className="font-serif font-bold text-sm leading-snug">{node.label}</div>
                {node.person_name && <div className="text-xs text-gold mt-1">{node.person_name}</div>}
              </div>

              {/* გვერდითი ყუთები */}
              {branches.map((b) => (
                <div key={b.id} className="flex items-start gap-2 md:gap-3">
                  <div className="w-2 md:w-3 h-px bg-line mt-8 shrink-0" />
                  <div className="bg-ink-2 border border-line rounded-xl px-4 py-3 max-w-[220px] hover:border-gold/50 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="text-sm leading-snug">{b.label}</div>
                    {b.person_name && <div className="text-xs text-gold mt-1">{b.person_name}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
