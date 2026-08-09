import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import { getAllCommitteeMembers } from "@/lib/queries";

export const revalidate = 0;

export default async function FederationCommitteePage() {
  const members = await getAllCommitteeMembers();

  return (
    <>
      <Header />
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-8">
          <div className="text-sm opacity-50 mb-3.5">
            <a href="/federation" className="hover:text-gold">ფედერაცია</a> / აღმასკომი
          </div>
          <h1 className="font-serif font-bold text-3xl md:text-4xl">აღმასკომი</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
          {members.map((m, i) => (
            <Reveal key={m.id} delay={Math.min((i % 5) + 1, 5)}>
              <div className="bg-ink-2 border border-line rounded-2xl p-6 h-full flex items-center gap-4 hover:border-gold/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                {m.photo_url ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                    <Image src={m.photo_url} alt={m.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gold/15 text-gold font-serif font-bold text-xl flex items-center justify-center shrink-0">
                    {m.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-base leading-snug">{m.name}</h3>
                  {m.role && <p className="text-sm opacity-60 mt-1">{m.role}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {members.length === 0 && <p className="opacity-50 text-sm pb-16">წევრი ჯერ არ არის დამატებული.</p>}
      </main>
      <Footer />
    </>
  );
}
