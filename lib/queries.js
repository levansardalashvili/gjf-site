import { supabase, getAdminClient } from "./supabase";

export async function getAllNews() {
  const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getNewsBySlug(slug) {
  const { data } = await supabase.from("news").select("*").eq("slug", slug).single();
  return data;
}

// მოახლოებული ღონისძიებები (თარიღით ზრდადობით) პირველად, გასული (ჩატარებული)
// ღონისძიებები კი ბოლოს, ყველაზე ბოლოს ჩატარებულიდან დასაწყისისკენ.
function sortUpcomingFirst(events) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const past = [];
  for (const e of events) {
    if (e.event_date && new Date(e.event_date) >= today) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  past.sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0));
  return [...upcoming, ...past];
}

export async function getAllEvents() {
  const { data } = await supabase.from("events").select("*");
  return sortUpcomingFirst(data || []);
}

export async function getEventBySlug(slug) {
  const { data } = await supabase.from("events").select("*").eq("slug", slug).single();
  return data;
}

export async function getEventsByCategory(category) {
  const { data } = await supabase.from("events").select("*").eq("category", category);
  return sortUpcomingFirst(data || []);
}

export async function getAllClubs() {
  const { data } = await supabase.from("clubs").select("*").order("name");
  return data || [];
}

// admin ფორმებისთვის — ID-ით ერთი ჩანაწერის წამოღება
export async function getNewsById(id) {
  const { data } = await supabase.from("news").select("*").eq("id", id).single();
  return data;
}

export async function getEventById(id) {
  const { data } = await supabase.from("events").select("*").eq("id", id).single();
  return data;
}

export async function getClubById(id) {
  const { data } = await supabase.from("clubs").select("*").eq("id", id).single();
  return data;
}

// pages (ფედერაცია/ისტორია/კონტაქტი — თავისუფალი ტექსტის გვერდები)
export async function getAllPages() {
  const { data } = await supabase.from("pages").select("*").order("title");
  return data || [];
}

export async function getPageBySlug(slug) {
  const { data } = await supabase.from("pages").select("*").eq("slug", slug).single();
  return data;
}

export async function getPageById(id) {
  const { data } = await supabase.from("pages").select("*").eq("id", id).single();
  return data;
}

// team_members (ნაკრების შემადგენლობა)
export async function getTeamMembersByCategory(category) {
  const { data } = await supabase.from("team_members").select("*").eq("category", category).order("weight");
  return data || [];
}

export async function getAllTeamMembers() {
  const { data } = await supabase.from("team_members").select("*").order("category").order("weight");
  return data || [];
}

export async function getTeamMemberById(id) {
  const { data } = await supabase.from("team_members").select("*").eq("id", id).single();
  return data;
}

export async function getTeamMemberBySlug(slug) {
  const { data } = await supabase.from("team_members").select("*").eq("slug", slug).single();
  return data;
}

// projects (ფედერაცია → პროექტები)
export async function getAllProjects() {
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getProjectBySlug(slug) {
  const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
  return data;
}

export async function getProjectById(id) {
  const { data } = await supabase.from("projects").select("*").eq("id", id).single();
  return data;
}

// partners (მთავარი გვერდის ქვედა ნაწილი)
export async function getAllPartners() {
  const { data } = await supabase.from("partners").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getPartnerById(id) {
  const { data } = await supabase.from("partners").select("*").eq("id", id).single();
  return data;
}

// results (შედეგები)
export async function getAllResults() {
  const { data } = await supabase.from("results").select("*").order("sort_order").order("created_at", { ascending: false });
  return data || [];
}

export async function getResultsByCategory(category) {
  const { data } = await supabase.from("results").select("*").eq("category", category).order("sort_order").order("created_at", { ascending: false });
  return data || [];
}

export async function getResultById(id) {
  const { data } = await supabase.from("results").select("*").eq("id", id).single();
  return data;
}

// gallery_items (ფოტო/ვიდეო გალერეა — ორივე ერთ ცხრილშია, type ველით)
export async function getGalleryByType(type) {
  const { data } = await supabase.from("gallery_items").select("*").eq("type", type).order("sort_order").order("created_at", { ascending: false });
  return data || [];
}

export async function getAllGalleryItems() {
  const { data } = await supabase.from("gallery_items").select("*").order("type").order("sort_order");
  return data || [];
}

export async function getGalleryItemById(id) {
  const { data } = await supabase.from("gallery_items").select("*").eq("id", id).single();
  return data;
}

// gallery_albums (ფოტო გალერეის ალბომები)
export async function getAllGalleryAlbums() {
  const { data } = await supabase.from("gallery_albums").select("*").order("sort_order").order("created_at", { ascending: false });
  return data || [];
}

export async function getGalleryAlbumById(id) {
  const { data } = await supabase.from("gallery_albums").select("*").eq("id", id).single();
  return data;
}

export async function getPhotosByAlbum(albumId) {
  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("album_id", albumId)
    .eq("type", "photo")
    .order("sort_order")
    .order("created_at");
  return data || [];
}

// staff_members (ფედერაციის შემადგენლობა)
export async function getAllStaffMembers() {
  const { data } = await supabase.from("staff_members").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getStaffMemberById(id) {
  const { data } = await supabase.from("staff_members").select("*").eq("id", id).single();
  return data;
}

// committee_members (აღმასკომი)
export async function getAllCommitteeMembers() {
  const { data } = await supabase.from("committee_members").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getCommitteeMemberById(id) {
  const { data } = await supabase.from("committee_members").select("*").eq("id", id).single();
  return data;
}

// commissions_members (კომისიები)
export async function getAllCommissionsMembers() {
  const { data } = await supabase.from("commissions_members").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getCommissionsMemberById(id) {
  const { data } = await supabase.from("commissions_members").select("*").eq("id", id).single();
  return data;
}

// regions (რეგიონები)
export async function getAllRegions() {
  const { data } = await supabase.from("regions").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getRegionById(id) {
  const { data } = await supabase.from("regions").select("*").eq("id", id).single();
  return data;
}

// regulations (დებულებები)
export async function getAllRegulations() {
  const { data } = await supabase.from("regulations").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getRegulationById(id) {
  const { data } = await supabase.from("regulations").select("*").eq("id", id).single();
  return data;
}

// structure_nodes (ორგანიზაციული სქემა)
export async function getAllStructureNodes() {
  const { data } = await supabase.from("structure_nodes").select("*").order("row_order").order("attach_to_row").order("sort_order");
  return data || [];
}

export async function getStructureNodeById(id) {
  const { data } = await supabase.from("structure_nodes").select("*").eq("id", id).single();
  return data;
}

// social_links (სოც. ქსელების ბმულები)
export async function getAllSocialLinks() {
  const { data } = await supabase.from("social_links").select("*").order("sort_order");
  return data || [];
}

// activity_log (admin-ის მოქმედებების ისტორია) — RLS-ის გამო service_role კლიენტით,
// რადგან ეს მონაცემი მხოლოდ admin პანელშივეა ხილული (საჯარო read policy არ აქვს).
export async function getRecentActivity(limit = 60) {
  const admin = getAdminClient();
  const { data } = await admin
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data || [];
}

// medal_records (მედლების სტატისტიკა)
export async function getAllMedalRecords() {
  const { data } = await supabase.from("medal_records").select("*").order("sort_order").order("athlete_name");
  return data || [];
}

export async function getMedalRecordById(id) {
  const { data } = await supabase.from("medal_records").select("*").eq("id", id).single();
  return data;
}

// portal_links (მთავარი გვერდის Portal ბლოკი)
export async function getAllPortalLinks() {
  const { data } = await supabase.from("portal_links").select("*").order("sort_order");
  return data || [];
}

export async function getPortalLinkById(id) {
  const { data } = await supabase.from("portal_links").select("*").eq("id", id).single();
  return data;
}

// calendar_regulations (კალენდარი → ფედერაციის დებულებები)
export async function getAllCalendarRegulations() {
  const { data } = await supabase.from("calendar_regulations").select("*").order("sort_order").order("created_at");
  return data || [];
}

export async function getCalendarRegulationById(id) {
  const { data } = await supabase.from("calendar_regulations").select("*").eq("id", id).single();
  return data;
}
