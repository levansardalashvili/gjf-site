import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEAM_CATEGORIES, getTeamCategory } from "@/lib/teams";
import { getTeamMembersByCategory } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export function generateMetadata({ params }) {
  const team = getTeamCategory(params.category);
  if (!team) return {};
  return { title: `${team.label} — ნაკრები — საქართველოს ჯუდოს ფედერაცია` };
}

export default async function TeamCategoryPage({ params }) {
  const team = getTeamCategory(params.category);
  if (!team) notFound();

  const roster = await getTeamMembersByCategory(params.category);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/teams" className="hover:text-gold">ნაკრებები</a> / {team.label}
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-2">{team.label}</h1>
          <p className="opacity-60">{team.desc}</p>
        </div>

        <table className="w-full border-collapse text-sm mb-16">
          <thead>
            <tr>
              <th className="text-left p-3 text-xs uppercase opacity-50 border-b border-line">წონითი კატეგორია</th>
              <th className="text-left p-3 text-xs uppercase opacity-50 border-b border-line">სპორტსმენი</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((r) => (
              <tr key={r.id}>
                <td className="p-3 opacity-65 border-b border-line">{r.weight}</td>
                <td className="p-3 border-b border-line">{r.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {roster.length === 0 && <p className="opacity-50 text-sm pb-16">შემადგენლობა ჯერ არ არის დამატებული.</p>}
      </main>
      <Footer />
    </>
  );
}
