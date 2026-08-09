import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "ფაილი არ მოიძებნა" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "დაშვებულია მხოლოდ PDF, JPG, PNG ან WEBP" }, { status: 400 });
  }

  const admin = getAdminClient();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // უნიკალური გზა, რომ ორმა ატვირთულმა ერთსახელოვანმა ფაილმა ერთმანეთი არ გადაფაროს
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "_")}`;

  const { error: uploadError } = await admin.storage
    .from("documents")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 });
  }

  const { data } = admin.storage.from("documents").getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl, name: file.name });
}
