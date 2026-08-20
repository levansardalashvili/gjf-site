import ClubsFilter from "@/components/ClubsFilter";
import { getAllClubs, getAllRegions } from "@/lib/queries";
import Trans from "@/components/Trans";

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
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5"><Trans k="home_bc" /> / <Trans k="federation" /> / <Trans k="clubs" /></div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2"><Trans k="clubsAndRegions" /></h1>
          <p className="opacity-60 max-w-lg"><Trans k="clubsSubtitle" /></p>
        </div>

        <div className="pb-16">
          <ClubsFilter clubs={clubs} regionNames={regionNames} initialRegion={initialRegion} />
        </div>
      </main>
    </>
  );
}
