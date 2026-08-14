import { getRecentActivity } from "@/lib/queries";
import { timeAgo } from "@/lib/timeAgo";

export const revalidate = 0;

// მოკლე, ადამიანურად წასაკითხი აღწერა route-იდან და მეთოდიდან
function describeAction(path, method) {
  const section = path.split("/")[2] || path; // /api/news/12 -> news
  const ACTION_LABELS = { POST: "დაამატა", PUT: "შეცვალა", DELETE: "წაშალა" };
  const SECTION_LABELS = {
    news: "სიახლე", events: "ღონისძიება", results: "შედეგი", "team-members": "სპორტსმენი",
    projects: "პროექტი", partners: "პარტნიორი", clubs: "კლუბი", staff: "თანამშრომელი",
    committee: "აღმასკომის წევრი", commissions: "კომისიის წევრი", regions: "რეგიონი",
    regulations: "დებულება", structure: "სტრუქტურის ელემენტი", gallery: "გალერეის ჩანაწერი",
    "gallery-albums": "ალბომი", pages: "გვერდი", "calendar-regulations": "კალენდრის დებულება",
    "social-links": "სოც. ქსელის ბმული", "portal-links": "Portal ჩანაწერი",
    admin: "თანამშრომელი",
  };
  const actionLabel = ACTION_LABELS[method] || method;
  const sectionLabel = SECTION_LABELS[section] || section;
  return `${actionLabel} — ${sectionLabel}`;
}

export default async function AdminActivityPage() {
  const activity = await getRecentActivity();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">აქტივობის ისტორია</h1>
      <p className="text-sm opacity-55 mb-6">ბოლო 60 მოქმედება — ვინ, რა და როდის შეცვალა admin პანელში.</p>

      <div className="bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {activity.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="font-semibold text-sm">{describeAction(a.path, a.method)}</div>
              <div className="text-xs opacity-50">{a.admin_email}</div>
            </div>
            <div className="text-xs opacity-45 shrink-0">{timeAgo(a.created_at)}</div>
          </div>
        ))}
        {activity.length === 0 && <p className="p-6 text-sm opacity-50">აქტივობა ჯერ არ დაფიქსირებულა.</p>}
      </div>
    </div>
  );
}
