import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { createClient } from "@/lib/supabase-server";

export async function DELETE(request, { params }) {
  // საკუთარი თავის წაშლა UI-ში დამალულია, მაგრამ სერვერზეც ვბლოკავთ —
  // წინააღმდეგ შემთხვევაში ვინმეს (ან ბაგმა) API-ის პირდაპირი გამოძახებით
  // შეუძლია admin-ს საკუთარი ანგარიშიდან გამორთვა.
  const supabase = createClient();
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  if (currentUser?.id === params.id) {
    return NextResponse.json({ error: "საკუთარი თავის წაშლა შეუძლებელია" }, { status: 400 });
  }

  const admin = getAdminClient();
  const { error } = await admin.auth.admin.deleteUser(params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
