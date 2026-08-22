import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { stripSystemFields } from "@/lib/sanitizeBody";

export async function PUT(request) {
  const body = await request.json();
  const admin = getAdminClient();

  const { data: existing } = await admin.from("live_broadcast").select("id").order("id").limit(1).single();
  if (!existing) {
    const { error } = await admin.from("live_broadcast").insert([{ ...stripSystemFields(body), updated_at: new Date().toISOString() }]);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  const { error } = await admin
    .from("live_broadcast")
    .update({ ...stripSystemFields(body), updated_at: new Date().toISOString() })
    .eq("id", existing.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
