import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const LIMIT = 5;

// PostgREST-ის სპეციალური სიმბოლოები (%, _, ,) ეშლის ilike/or query-ს — ვასუფთავებთ
function sanitize(q) {
  return q.replace(/[%_,]/g, " ").trim();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const raw = (searchParams.get("q") || "").trim();

  if (raw.length < 2) {
    return NextResponse.json({ news: [], events: [], results: [], athletes: [], projects: [], clubs: [] });
  }

  const q = sanitize(raw);
  const like = `%${q}%`;

  // ბაზის დონეზე (SQL ilike) ფილტრაცია — არა მთელი ცხრილის წამოღება.
  const [newsRes, eventsRes, resultsRes, membersRes, staffRes, projectsRes, clubsRes] = await Promise.all([
    supabase.from("news").select("id, slug, title").ilike("title", like).limit(LIMIT),
    supabase.from("events").select("id, slug, title, location").or(`title.ilike.${like},location.ilike.${like}`).limit(LIMIT),
    supabase.from("results").select("id, event_name, athlete").or(`event_name.ilike.${like},athlete.ilike.${like}`).limit(LIMIT),
    supabase.from("team_members").select("id, name").ilike("name", like).limit(LIMIT),
    supabase.from("staff_members").select("id, name").ilike("name", like).limit(LIMIT),
    supabase.from("projects").select("id, slug, title").ilike("title", like).limit(LIMIT),
    supabase.from("clubs").select("id, name, location").or(`name.ilike.${like},location.ilike.${like}`).limit(LIMIT),
  ]);

  const athletes = [
    ...(membersRes.data || []).map((m) => ({ ...m, kind: "member" })),
    ...(staffRes.data || []).map((s) => ({ ...s, kind: "staff" })),
  ].slice(0, LIMIT);

  return NextResponse.json({
    news: newsRes.data || [],
    events: eventsRes.data || [],
    results: resultsRes.data || [],
    athletes,
    projects: projectsRes.data || [],
    clubs: clubsRes.data || [],
  });
}
