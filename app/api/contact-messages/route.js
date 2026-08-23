import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { isRateLimited } from "@/lib/rateLimit";

// საჯარო endpoint — ვინც საიტზეა, მას ავტორიზაცია არ სჭირდება ფორმის გასაგზავნად
export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (await isRateLimited(`contact:${ip}`, { windowMs: 60_000, max: 5 })) {
    return NextResponse.json({ error: "მოთხოვნები ძალიან ხშირია — ცოტა ხნის შემდეგ სცადე" }, { status: 429 });
  }

  const { name, email, message } = await request.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "ყველა ველი სავალდებულოა" }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "ტექსტი ძალიან გრძელია" }, { status: 400 });
  }

  const admin = getAdminClient();
  const { error } = await admin.from("contact_messages").insert([{ name: name.trim(), email: email.trim(), message: message.trim() }]);

  if (error) return NextResponse.json({ error: "ვერ გაიგზავნა, სცადე ხელახლა" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
