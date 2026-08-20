// Postgres-ის ტექნიკურ შეცდომებს ქართულ, გასაგებ ტექსტად გარდაქმნის
export function friendlyError(message) {
  if (!message) return "შეცდომა შენახვისას";
  if (message.includes("duplicate key") && message.includes("slug")) {
    return "ეს URL (slug) უკვე დაკავებულია — შეცვალე ან სცადე სხვა";
  }
  if (message.includes("duplicate key")) {
    return "ეს ჩანაწერი უკვე არსებობს";
  }
  if (message.includes("violates not-null")) {
    return "ერთი ან რამდენიმე სავალდებულო ველი ცარიელია";
  }
  return message;
}
