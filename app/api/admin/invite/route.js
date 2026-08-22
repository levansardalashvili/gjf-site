import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { friendlyError } from "@/lib/friendlyError";

export async function POST(request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "ელფოსტა აუცილებელია" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const admin = getAdminClient();

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${origin}/admin/set-password`,
  });

  if (error) {
    return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  }

  return NextResponse.json({ ok: true, user: data.user });
}
