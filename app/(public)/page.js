import HomeContent from "@/components/HomeContent";
import { getAllNews, getAllEvents, getAllProjects, getAllPartners, getAllPortalLinks, getLiveBroadcast } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const news = await getAllNews();
  const events = await getAllEvents();
  const projects = await getAllProjects();
  const partners = await getAllPartners();
  const portalLinks = await getAllPortalLinks();
  const live = await getLiveBroadcast();

  let carouselNews = news.slice(0, 4);
  if (live?.is_live && live?.photo_url) {
    carouselNews = [
      {
        slug: "live-broadcast",
        image_url: live.photo_url,
        title: live.tournament_name || "პირდაპირი ეთერი",
        date: "პირდაპირი ეთერი",
        external_url: live.youtube_url || undefined,
        isLive: true,
      },
      ...carouselNews,
    ].slice(0, 4);
  }

  const featuredProjects = projects.slice(0, 5);

  return (
    <>
      <HomeContent
        carouselNews={carouselNews}
        events={events}
        featuredProjects={featuredProjects}
        partners={partners}
        portalLinks={portalLinks}
      />
    </>
  );
}
