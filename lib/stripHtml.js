// HTML ტეგების მოცილება (meta description-ისთვის და მისთ.)
export function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
