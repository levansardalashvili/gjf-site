import { getEventBySlug } from "@/lib/queries";
import Icon from "@/components/Icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Trans from "@/components/Trans";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
    openGraph: { title: event.title, description: event.description, type: "article" },
  };
}

export default async function EventDetailPage({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-5">
        <div className="text-sm opacity-50 pt-8 pb-2">
          <a href="/calendar" className="hover:text-gold"><Trans k="calendar" /></a> / {event.title}
        </div>
        <div className="my-6 rounded-2xl overflow-hidden bg-gradient-to-br from-crimson to-crimson-dark p-7 text-white">
          <span className="inline-block bg-white/20 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase mb-4">{event.tag}</span>
          <h1 className="font-serif font-bold text-3xl md:text-4xl leading-tight mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-5 text-sm text-white/85">
            <div className="flex items-center gap-2"><Icon name="calendar" size={15} />{event.date_range}</div>
            <div className="flex items-center gap-2"><Icon name="pin" size={15} />{event.location}</div>
          </div>
        </div>
        <p className="opacity-80 mb-16">{event.description}</p>
      </main>
      <Footer />
    </>
  );
}
