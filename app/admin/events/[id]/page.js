import { getEventById } from "@/lib/queries";
import EventForm from "@/components/admin/EventForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditEventPage({ params }) {
  const item = await getEventById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ღონისძიების რედაქტირება</h1>
      <EventForm initial={item} id={params.id} />
    </div>
  );
}
