import Trans from "@/components/Trans";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { getTeamCategory } from "@/lib/teams";
import { getTeamMembersByCategory } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 60;

export function generateMetadata({ params }) {
  const team = getTeamCategory(params.category);
  if (!team) return {};
  return { title: `${team.slug} — საქართველოს ძიუდოს ფედერაცია` };
}

export default async function TeamCategoryPage({ params }) {
  const team = getTeamCategory(params.category);
  if (!team) notFound();

  const roster = await getTeamMembersByCategory(params.category);

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/teams" className="hover:text-gold"><Trans k="teams" /></a> / <Trans k={team.labelKey} />
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2"><Trans k={team.labelKey} /></h1>
          <p className="opacity-60"><Trans k={team.descKey} /></p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-16">
          {roster.map((r, i) => (
            <Reveal key={r.id} delay={Math.min((i % 5) + 1, 5)}>
              <Link
                href={`/teams/athlete/${r.slug}`}
                className="group block bg-ink-2 border border-line rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square bg-ink">
                  {r.photo_url ? (
                    <Image src={r.photo_url} alt={r.name} fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-serif font-bold text-gold/30">
                      {r.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-3.5">
                  <div className="text-xs text-crimson font-bold mb-1">{r.weight}</div>
                  <div className="font-semibold text-sm leading-snug group-hover:text-gold transition-colors">{r.name}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {roster.length === 0 && <p className="opacity-50 text-sm pb-16"><Trans k="noRosterYet" /></p>}
      </main>
    </>
  );
}
