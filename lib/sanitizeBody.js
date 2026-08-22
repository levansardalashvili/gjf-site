// admin CRUD endpoint-ებში request body-დან სისტემური ველების მოცილება, insert/update-მდე —
// client-მა (ან კომპრომეტირებულმა admin სესიამ) არასდროს არ უნდა შეძლოს საკუთარი id-ის
// ან timestamp-ების პირდაპირ დაწერა (mass assignment-ის თავიდან ასაცილებლად).
const SYSTEM_FIELDS = ["id", "created_at", "updated_at"];

export function stripSystemFields(body) {
  const clean = { ...body };
  for (const field of SYSTEM_FIELDS) delete clean[field];
  return clean;
}
