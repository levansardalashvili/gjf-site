import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-16">
          <div className="font-serif font-black text-7xl md:text-8xl text-gold/30 mb-4">404</div>
          <h1 className="font-serif font-bold text-2xl md:text-3xl mb-3">გვერდი ვერ მოიძებნა</h1>
          <p className="opacity-60 mb-8 max-w-md">
            სამწუხაროდ, მოძებნილი გვერდი აღარ არსებობს ან გადატანილია.
          </p>
          <Link
            href="/"
            className="bg-crimson px-6 py-3 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors"
          >
            მთავარ გვერდზე დაბრუნება
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
