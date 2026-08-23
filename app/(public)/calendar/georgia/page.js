import CalendarPaginated from "@/components/CalendarPaginated";
import CalendarRegulations from "@/components/CalendarRegulations";
import { getEventsByCategory, getPageBySlug, getAllCalendarRegulations } from "@/lib/queries";
import Trans from "@/components/Trans";
import Icon from "@/components/Icon";

export const revalidate = 60;

export default async function CalendarGeorgiaPage() {
  const events = await getEventsByCategory("georgia");
  const yearlyPdf = await getPageBySlug("calendar-yearly-pdf");
  const regulations = await getAllCalendarRegulations();

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-5">
        <div className="pt-10 pb-7">
          <div className="text-sm opacity-50 mb-3.5"><a href="/calendar" className="hover:text-gold"><Trans k="calendar" /></a> / <Trans k="georgia" /></div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="font-serif font-bold text-3xl md:text-4xl"><Trans k="calendarGeorgia" /></h1>
            {yearlyPdf?.file_url && (
              <a
                href={yearlyPdf.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-crimson px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-crimson-dark transition-colors"
              >
                <Icon name="document" size={16} />
                მთლიანი წლის კალენდარი
              </a>
            )}
          </div>
        </div>
        <div className="pb-16">
          <CalendarPaginated events={events} />
        </div>
        <CalendarRegulations items={regulations} />
        <div className="pb-16" />
      </main>
    </>
  );
}
