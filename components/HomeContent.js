"use client";
import HeroCarousel from "./HeroCarousel";
import CalendarTabs from "./CalendarTabs";
import ProjectCard from "./ProjectCard";
import PortalLinks from "./PortalLinks";
import NationalTeamLinks from "./NationalTeamLinks";
import PartnersStrip from "./PartnersStrip";
import MainEventsPanel from "./MainEventsPanel";
import Reveal from "./Reveal";
import AnimatedNumber from "./AnimatedNumber";
import { useLanguage } from "@/lib/i18n";

export default function HomeContent({ carouselNews, events, featuredProjects, partners, portalLinks }) {
  const { t } = useLanguage();

  const STATS = [
    ["8", t("statOlympic")],
    ["15", t("statWorld")],
    ["57", t("statEurope")],
  ];

  const mainEvents = events.filter((e) => e.is_main_event).slice(0, 5);

  return (
    <main>
      {/* 1. Hero კონტეინერი */}
      <section className="pt-6 max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-stretch">
          <HeroCarousel news={carouselNews} showThumbnails />
          <MainEventsPanel events={mainEvents} />
        </div>
      </section>

      {/* 2. კალენდარი */}
      <div className="w-full bg-ink-2 border-y border-line mt-8">
        <div className="max-w-[1400px] mx-auto px-5 py-14">
          <Reveal>
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
              <h2 className="font-serif font-bold text-2xl">{t("calendar")}</h2>
              <a href="/calendar" className="text-sm font-bold text-gold hover:opacity-80 transition-opacity">{t("fullCalendar")} →</a>
            </div>
            <CalendarTabs events={events} limit={5} />
          </Reveal>
        </div>
      </div>

      {/* 3. Portal (შედეგები/ადმინი) */}
      <PortalLinks links={portalLinks} />

      {/* 4. სტატისტიკა */}
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

      {featuredProjects.length > 0 && (
        <div className="w-full py-16">
          <div className="max-w-[1400px] mx-auto px-5">
            <Reveal>
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                <h2 className="font-serif font-bold text-2xl">{t("currentProjects")}</h2>
                <a href="/federation/projects" className="text-sm font-bold text-gold hover:opacity-80 transition-opacity">{t("allProjects")} →</a>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredProjects.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i + 1, 5)}>
                  <ProjectCard {...p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}

      <NationalTeamLinks />

      <PartnersStrip partners={partners} />
    </main>
  );
}
