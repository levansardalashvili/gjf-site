import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClubsPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-5">
        <div className="pt-10 pb-24">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ფედერაცია / კლუბები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-6">კლუბები</h1>
          <p className="opacity-60 text-lg">კლუბები მალე დაემატება.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
