import { cookies } from "next/headers";

// ენის არჩევანის წაკითხვა სერვერულ კომპონენტებში (generateMetadata, layout.js) —
// LanguageProvider (lib/i18n.js) იგივე cookie-ს წერს, როცა მომხმარებელი ENG/ქართ-ს არჩევს.
export function getServerLang() {
  return cookies().get("gjf_lang")?.value === "en" ? "en" : "ka";
}
