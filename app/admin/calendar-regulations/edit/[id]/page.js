import { getCalendarRegulationById } from "@/lib/queries";
import CalendarRegulationForm from "@/components/admin/CalendarRegulationForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditCalendarRegulationPage({ params }) {
  const item = await getCalendarRegulationById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">დებულების რედაქტირება</h1>
      <CalendarRegulationForm initial={item} id={params.id} />
    </div>
  );
}
