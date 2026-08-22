import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { stripSystemFields } from "@/lib/sanitizeBody";

export async function POST(request) {
  const body = await request.json();
  const admin = getAdminClient();
  const { data, error } = await admin.from("social_links").insert([stripSystemFields(body)]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
