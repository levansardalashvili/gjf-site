import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import CalendarTabs from "@/components/CalendarTabs";
import ProjectCard from "@/components/ProjectCard";
import PortalLinks from "@/components/PortalLinks";
import NationalTeamLinks from "@/components/NationalTeamLinks";
import PartnersStrip from "@/components/PartnersStrip";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import { getAllNews, getAllEvents, getAllProjects, getAllPartners } from "@/lib/queries";

export const revalidate = 60;

const STATS = [
  ["8", "ოლიმპიური ოქრო"],
  ["15", "მსოფლიოს ჩემპიონატის ოქრო"],
  ["57", "ევროპის ჩემპიონატის ოქრო"],
];

export default async function Home() {
  const news = await getAllNews();
  const events = await getAllEvents();
  const projects = await getAllProjects();
  const partners = await getAllPartners();
  const carouselNews = news.slice(0, 5);
  const featuredProjects = projects.slice(0, 5);

  return (
    <>
      <Header />
      <main>
        <HeroCarousel news={carouselNews} fullBleed />

        <section className="py-10 max-w-[1400px] mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {STATS.map(([num, lbl], i) => (
              <Reveal key={lbl} delay={i + 1} className="bg-ink-2 p-5">
                <div className="font-serif font-bold text-3xl text-gold">
                  <AnimatedNumber value={num} />
                </div>
                <div className="text-xs opacity-65 mt-0.5">{lbl}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="w-full bg-ink-2 border-y border-line">
          <div className="max-w-[1400px] mx-auto px-5 py-14">
            <Reveal>
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                <h2 className="font-serif font-bold text-2xl">კალენდარი</h2>
                <a href="/calendar" className="text-sm font-bold text-gold hover:opacity-80 transition-opacity">სრული კალენდარი →</a>
              </div>
              <CalendarTabs events={events} />
            </Reveal>
          </div>
        </div>

        <PortalLinks />

        {featuredProjects.length > 0 && (
          <div className="w-full py-16">
            <div className="max-w-[1400px] mx-auto px-5">
              <Reveal>
                <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                  <h2 className="font-serif font-bold text-2xl">მიმდინარე პროექტები</h2>
                  <a href="/federation/projects" className="text-sm font-bold text-gold hover:opacity-80 transition-opacity">ყველა პროექტი →</a>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {featuredProjects.map((p, i) => (
                  <Reveal key={p.slug} delay={Math.min(i + 1, 5)}>
                    <ProjectCard {...p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}

        <NationalTeamLinks />

        <PartnersStrip partners={partners} />
      </main>
      <Footer />
    </>
  );
}
