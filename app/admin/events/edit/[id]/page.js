import { getEventById } from "@/lib/queries";
import EventForm from "@/components/admin/EventForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditEventPage({ params }) {
  const event = await getEventById(params.id);
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ღონისძიების რედაქტირება</h1>
      <EventForm initial={event} id={params.id} />
    </div>
  );
}
