import { addLinkTargets } from "@/lib/richHtml";
import Image from "next/image";
import Trans from "@/components/Trans";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getTeamMemberBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

export const revalidate = 0;

const GROUP_KEY = { standart: "seniors", youth: "juniors", kids: "cadets", women: "women_bc" };

export async function generateMetadata({ params }) {
  const athlete = await getTeamMemberBySlug(params.slug);
  if (!athlete) return {};
  return { title: athlete.name };
}

export default async function AthletePage({ params }) {
  const athlete = await getTeamMemberBySlug(params.slug);
  if (!athlete) notFound();

  const achievementsList = (athlete.achievements || "")
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "მთავარი", url: SITE_URL },
          { name: "ნაკრები", url: `${SITE_URL}/teams` },
          { name: athlete.name, url: `${SITE_URL}/teams/athlete/${athlete.slug}` },
        ]}
      />
      <main className="max-w-3xl mx-auto px-5">
        <div className="text-sm opacity-50 pt-8 pb-6">
          <a href="/teams" className="hover:text-gold"><Trans k="teams" /></a> /{" "}
          <a href={`/teams/${athlete.category}`} className="hover:text-gold"><Trans k={GROUP_KEY[athlete.category]} /></a> / {athlete.name}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start pb-10">
          <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden bg-ink-2 border border-line shrink-0">
            {athlete.photo_url ? (
              <Image src={athlete.photo_url} alt={athlete.name} fill sizes="224px" className="object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-serif font-bold text-gold/40">
                {athlete.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-serif font-bold text-3xl mb-2">{athlete.name}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-crimson text-white text-xs font-extrabold px-3 py-1.5 rounded-full">{athlete.weight}</span>
              {athlete.birth_year && (
                <span className="bg-ink-2 border border-line text-xs font-semibold px-3 py-1.5 rounded-full opacity-75">
                  {new Date().getFullYear() - athlete.birth_year} წლის
                </span>
              )}
              {athlete.club && (
                <span className="bg-ink-2 border border-line text-xs font-semibold px-3 py-1.5 rounded-full opacity-75">
                  {athlete.club}
                </span>
              )}
            </div>
            {athlete.bio && <div className="opacity-80 leading-relaxed rich-content" dangerouslySetInnerHTML={{ __html: addLinkTargets(athlete.bio) }} />}
          </div>
        </div>

        {achievementsList.length > 0 && (
          <div className="border-t border-line pt-8 pb-16">
            <h2 className="font-serif font-bold text-xl mb-4">მიღწევები</h2>
            <ul className="flex flex-col gap-2.5">
              {achievementsList.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="text-gold mt-0.5">●</span>
                  <span className="opacity-85">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}
