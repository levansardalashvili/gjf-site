import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

export async function DELETE(request, { params }) {
  const admin = getAdminClient();
  const { error } = await admin.auth.admin.deleteUser(params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
