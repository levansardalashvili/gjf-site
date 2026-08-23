import { getEventBySlug } from "@/lib/queries";
import { stripHtml } from "@/lib/stripHtml";
import EventDetailContent from "@/components/EventDetailContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SportsEventJsonLd from "@/components/SportsEventJsonLd";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gjf.ge";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return {};
  const description = stripHtml(event.description)?.slice(0, 160);
  return {
    title: event.title,
    description,
    openGraph: { title: event.title, description, type: "article" },
  };
}

export default async function EventDetailPage({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const eventUrl = `${SITE_URL}/calendar/${event.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "მთავარი", url: SITE_URL },
          { name: "კალენდარი", url: `${SITE_URL}/calendar` },
          { name: event.title, url: eventUrl },
        ]}
      />
      <SportsEventJsonLd event={event} url={eventUrl} description={stripHtml(event.description)?.slice(0, 300)} />
      <main className="max-w-3xl mx-auto px-5">
        <EventDetailContent event={event} />
      </main>
    </>
  );
}
