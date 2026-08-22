import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { friendlyError } from "@/lib/friendlyError";
import { stripSystemFields } from "@/lib/sanitizeBody";

export async function POST(request) {
  const body = await request.json();
  const admin = getAdminClient();
  const { data, error } = await admin.from("committee_members").insert([stripSystemFields(body)]).select().single();
  if (error) return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  return NextResponse.json(data);
}
