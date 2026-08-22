import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { friendlyError } from "@/lib/friendlyError";

export async function PUT(request, { params }) {
  const admin = getAdminClient();
  const { error } = await admin.from("contact_messages").update({ is_read: true }).eq("id", params.id);
  if (error) return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const admin = getAdminClient();
  const { error } = await admin.from("contact_messages").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  return NextResponse.json({ ok: true });
}
