import { getAllContactMessages } from "@/lib/queries";
import { timeAgo } from "@/lib/timeAgo";
import DeleteButton from "@/components/admin/DeleteButton";
import MarkReadButton from "@/components/admin/MarkReadButton";

export const revalidate = 0;

export default async function AdminContactMessagesPage() {
  const messages = await getAllContactMessages();
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">საკონტაქტო შეტყობინებები</h1>
      <p className="text-sm opacity-55 mb-6">
        {unreadCount > 0 ? `${unreadCount} წაუკითხავი შეტყობინება` : "ყველა შეტყობინება წაკითხულია"}
      </p>

      <div className="flex flex-col gap-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`bg-ink-2 border rounded-2xl p-5 ${m.is_read ? "border-line" : "border-gold/50"}`}
          >
            <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
              <div className="flex items-center gap-2.5">
                {!m.is_read && <span className="w-2 h-2 rounded-full bg-gold shrink-0" />}
                <span className="font-semibold">{m.name}</span>
                <a href={`mailto:${m.email}`} className="text-sm text-gold hover:opacity-80">{m.email}</a>
              </div>
              <div className="flex items-center gap-4 text-xs opacity-50 shrink-0">
                <span>{timeAgo(m.created_at)}</span>
                {!m.is_read && <MarkReadButton id={m.id} />}
                <DeleteButton endpoint={`/api/contact-messages/${m.id}`} confirmText="ეს შეტყობინება მუდმივად წაიშლება." />
              </div>
            </div>
            <p className="text-sm opacity-80 whitespace-pre-line">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="p-6 text-sm opacity-50 bg-ink-2 border border-line rounded-2xl">შეტყობინება ჯერ არ არის.</p>
        )}
      </div>
    </div>
  );
}
