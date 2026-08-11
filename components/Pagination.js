"use client";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 pt-8">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-sm disabled:opacity-30 hover:border-gold/50 transition-colors"
        aria-label="წინა გვერდი"
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-lg border text-sm font-semibold transition-colors ${
            p === page ? "bg-crimson border-crimson" : "border-line hover:border-gold/50"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-sm disabled:opacity-30 hover:border-gold/50 transition-colors"
        aria-label="შემდეგი გვერდი"
      >
        →
      </button>
    </div>
  );
}
