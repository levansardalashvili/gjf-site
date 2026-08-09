import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClubsFilter from "@/components/ClubsFilter";
import { getAllClubs, getAllRegions } from "@/lib/queries";

export const revalidate = 60;

export default async function ClubsPage({ searchParams }) {
  const clubs = await getAllClubs();
  const regionsData = await getAllRegions();
  const regionNames = regionsData.length
    ? regionsData.map((r) => r.name)
    : [...new Set(clubs.map((c) => c.region))];

  const initialRegion = searchParams?.region || null;

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">მთავარი / ფედერაცია / კლუბები</div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2">კლუბები და რეგიონები</h1>
          <p className="opacity-60 max-w-lg">იპოვეთ უახლოესი ჯუდოს კლუბი საქართველოს რეგიონებში.</p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-[1.1fr_1fr] pb-10">
          <div className="relative bg-ink-2 border border-line rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(176,36,47,0.35),transparent_40%),radial-gradient(circle_at_65%_60%,rgba(201,162,39,0.25),transparent_35%),linear-gradient(160deg,#232833,#171a20)]" />
            <div className="absolute bottom-3.5 left-3.5 text-xs bg-ink/75 px-3 py-2 rounded-lg opacity-80">📍 {clubs.length} კლუბი რუკაზე</div>
          </div>

          <ClubsFilter clubs={clubs} regionNames={regionNames} initialRegion={initialRegion} />
        </div>
      </main>
      <Footer />
    </>
  );
}
