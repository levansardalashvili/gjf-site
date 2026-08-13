import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import { getAllNews, getAllEvents, getAllProjects, getAllPartners, getAllPortalLinks } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const news = await getAllNews();
  const events = await getAllEvents();
  const projects = await getAllProjects();
  const partners = await getAllPartners();
  const portalLinks = await getAllPortalLinks();
  const carouselNews = news.slice(0, 4);
  const featuredProjects = projects.slice(0, 5);

  return (
    <>
      <Header />
      <HomeContent
        carouselNews={carouselNews}
        events={events}
        featuredProjects={featuredProjects}
        partners={partners}
        portalLinks={portalLinks}
      />
      <Footer />
    </>
  );
}
