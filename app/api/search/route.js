import { NextResponse } from "next/server";
import {
  getAllNews,
  getAllEvents,
  getAllResults,
  getAllTeamMembers,
  getAllProjects,
  getAllStaffMembers,
  getAllClubs,
} from "@/lib/queries";

function matches(text, q) {
  return text && text.toLowerCase().includes(q);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  if (q.length < 2) {
    return NextResponse.json({ news: [], events: [], results: [], athletes: [], projects: [], clubs: [] });
  }

  const [news, events, results, members, projects, staff, clubs] = await Promise.all([
    getAllNews(),
    getAllEvents(),
    getAllResults(),
    getAllTeamMembers(),
    getAllProjects(),
    getAllStaffMembers(),
    getAllClubs(),
  ]);

  const LIMIT = 5;

  const newsHits = news.filter((n) => matches(n.title, q)).slice(0, LIMIT);
  const eventsHits = events.filter((e) => matches(e.title, q) || matches(e.location, q)).slice(0, LIMIT);
  const resultsHits = results.filter((r) => matches(r.event_name, q) || matches(r.athlete, q)).slice(0, LIMIT);
  const athleteHits = [
    ...members.filter((m) => matches(m.name, q)).map((m) => ({ ...m, kind: "member" })),
    ...staff.filter((s) => matches(s.name, q)).map((s) => ({ ...s, kind: "staff" })),
  ].slice(0, LIMIT);
  const projectHits = projects.filter((p) => matches(p.title, q)).slice(0, LIMIT);
  const clubHits = clubs.filter((c) => matches(c.name, q) || matches(c.location, q)).slice(0, LIMIT);

  return NextResponse.json({
    news: newsHits,
    events: eventsHits,
    results: resultsHits,
    athletes: athleteHits,
    projects: projectHits,
    clubs: clubHits,
  });
}
