"use client";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-ink">
      <div className="font-serif font-black text-6xl text-crimson/30 mb-4">!</div>
      <h1 className="font-serif font-bold text-2xl mb-3">დაფიქსირდა შეცდომა</h1>
      <p className="opacity-60 mb-8 max-w-md">
        რაღაც მოულოდნელად შეცდა. სცადე ხელახლა, ან დაბრუნდი მთავარ გვერდზე.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="bg-crimson px-6 py-3 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors"
        >
          ხელახლა ცდა
        </button>
        <a
          href="/"
          className="bg-ink-2 border border-line px-6 py-3 rounded-lg text-sm font-bold hover:border-gold/50 transition-colors"
        >
          მთავარი გვერდი
        </a>
      </div>
    </div>
  );
}
