import { getAllNews, getAllEvents, getAllProjects, getAllGalleryAlbums } from "@/lib/queries";

const STATIC_ROUTES = [
  "", "/news", "/calendar", "/calendar/georgia", "/calendar/international",
  "/results", "/results/georgia", "/results/international",
  "/gallery", "/gallery/photo", "/gallery/video",
  "/federation", "/federation/staff", "/federation/committee", "/federation/commissions",
  "/federation/structure", "/federation/statute", "/federation/regions",
  "/federation/regulations", "/federation/projects",
  "/clubs", "/teams", "/teams/standart", "/teams/youth", "/teams/kids", "/teams/women",
  "/judo", "/judo/history", "/judo/archive", "/judo/statistic",
  "/contact",
];

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

  const [news, events, projects, albums] = await Promise.all([
    getAllNews(),
    getAllEvents(),
    getAllProjects(),
    getAllGalleryAlbums(),
  ]);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const newsEntries = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventEntries = events.map((e) => ({
    url: `${baseUrl}/calendar/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const projectEntries = projects.map((p) => ({
    url: `${baseUrl}/federation/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const albumEntries = albums.map((a) => ({
    url: `${baseUrl}/gallery/photo/${a.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticEntries, ...newsEntries, ...eventEntries, ...projectEntries, ...albumEntries];
}
