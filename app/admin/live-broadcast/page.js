import { getLiveBroadcast } from "@/lib/queries";
import LiveBroadcastForm from "@/components/admin/LiveBroadcastForm";

export const revalidate = 0;

export default async function AdminLiveBroadcastPage() {
  const live = await getLiveBroadcast();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">ლაივი (YouTube)</h1>
      <p className="text-sm opacity-55 mb-6">
        როცა "ლაივი მიმდინარეობს" ჩართული გექნება, ეს ავტომატურად პირველივე გამოჩნდება მთავარი გვერდის carousel-ში.
      </p>
      <LiveBroadcastForm initial={live} />
    </div>
  );
}
