import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { friendlyError } from "@/lib/friendlyError";

export async function PUT(request, { params }) {
  const body = await request.json();
  const admin = getAdminClient();
  const { data, error } = await admin.from("projects").update(body).eq("id", params.id).select().single();
  if (error) return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  const admin = getAdminClient();
  const { error } = await admin.from("projects").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  return NextResponse.json({ ok: true });
}
