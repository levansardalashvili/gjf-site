import { getAdminClient } from "@/lib/supabase";
import InviteUserForm from "@/components/admin/InviteUserForm";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const admin = getAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();
  const users = error ? [] : data.users;

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-2">თანამშრომლები</h1>
      <p className="text-sm opacity-55 mb-6">
        ვისაც აქ დაამატებ, admin პანელში სრული წვდომა ექნება — დამატება, რედაქტირება, წაშლა ყველგან.
      </p>

      <InviteUserForm />

      <div className="mt-8 bg-ink-2 border border-line rounded-2xl overflow-hidden">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between gap-4 px-5 py-4 border-b border-line last:border-0">
            <div className="min-w-0">
              <div className="font-semibold truncate">{u.email}</div>
              <div className="text-xs opacity-50 mt-0.5">
                {u.last_sign_in_at ? "შესულა უკვე" : "ჯერ არ შესულა (მოწვევა გაგზავნილია)"}
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && <p className="p-6 text-sm opacity-50">მომხმარებელი ვერ მოიძებნა.</p>}
      </div>
    </div>
  );
}
