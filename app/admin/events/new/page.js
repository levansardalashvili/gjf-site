import EventForm from "@/components/admin/EventForm";

export default function NewEventPage({ searchParams }) {
  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">ახალი ღონისძიება</h1>
      <EventForm defaultCategory={searchParams?.category} />
    </div>
  );
}
