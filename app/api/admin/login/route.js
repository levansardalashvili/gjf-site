import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "არასწორი პაროლი" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("gjf_admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 დღე
  });
  return response;
}
