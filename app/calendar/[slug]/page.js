import { getEventBySlug } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return {};
  return {
    title: `${event.title} — საქართველოს ძიუდოს ფედერაცია`,
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
          <a href="/calendar" className="hover:text-gold">კალენდარი</a> / {event.title}
        </div>
        <div className="my-6 rounded-2xl overflow-hidden border border-line bg-gradient-to-br from-[#26303f] to-[#171a20] p-7">
          <span className="inline-block bg-crimson text-xs font-extrabold px-3 py-1.5 rounded-full uppercase mb-4">{event.tag}</span>
          <h1 className="font-serif font-bold text-3xl md:text-4xl leading-tight mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-5 text-sm opacity-85">
            <div className="flex items-center gap-2">📅 {event.date_range}</div>
            <div className="flex items-center gap-2">📍 {event.location}</div>
          </div>
        </div>
        <p className="opacity-80 mb-16">{event.description}</p>
      </main>
      <Footer />
    </>
  );
}
