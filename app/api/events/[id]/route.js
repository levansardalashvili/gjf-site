import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

export async function PUT(request, { params }) {
  const body = await request.json();
  const admin = getAdminClient();
  const { data, error } = await admin.from("events").update(body).eq("id", params.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  const admin = getAdminClient();
  const { error } = await admin.from("events").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
