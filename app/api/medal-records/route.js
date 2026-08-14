import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

export async function POST(request) {
  const body = await request.json();
  const admin = getAdminClient();
  const { data, error } = await admin.from("medal_records").insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
