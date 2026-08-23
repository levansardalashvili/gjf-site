import sanitizeHtmlLib from "sanitize-html";

// admin-ის Quill რედაქტორის ამჟამინდელ toolbar-ს ამათგან მხოლოდ ნაწილი გამოაქვს,
// მაგრამ უფრო ძველი/სხვაგვარად შექმნილი ჩანაწერების ფორმატირება რომ არ დაიკარგოს
// (heading, blockquote და ა.შ. მართლაც უსაფრთხო, non-executable ტეგებია), ცოტა
// უფრო ფართო allowlist გვაქვს, ვიდრე მკაცრად საჭიროა დღეს. საშიში ყველაფერი
// (<script>, on*= event handler-ები, javascript: ბმულები) მაინც იჭრება.
//
// ⚠️ isomorphic-dompurify-ის ნაცვლად (ის jsdom-ს იყენებდა შიგნით, რომლის ერთ-ერთმა
// ქვე-დამოკიდებულებამ Vercel-ის სერვერულ გარემოში ESM/CommonJS კონფლიქტის გამო
// ყველა rich-text გვერდი გაუტეხა — 500 შეცდომა). sanitize-html სუფთა JS-ია,
// jsdom-ის გარეშე, სერვერზეც და ბრაუზერშიც ერთნაირად საიმედოდ მუშაობს.
const ALLOWED_TAGS = [
  "p", "br", "b", "strong", "i", "em", "u", "s", "span",
  "a", "ul", "ol", "li", "img",
  "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "code", "hr",
];
const ALLOWED_ATTR = ["href", "target", "rel", "style", "src", "alt", "width", "height", "class"];

// admin-ის rich-text ველების (news/events/pages/... body) გამწმენდი — შლის ნებისმიერ
// შესრულებად კოდს (stored XSS-ის თავიდან ასაცილებლად), სანამ HTML DOM-ში მოხვდება.
export function sanitizeHtml(html) {
  if (!html) return html;
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { "*": ALLOWED_ATTR },
  });
}

// rich text-ის ბმულებს ამატებს target="_blank" — რომ დაკლიკებისას
// მომხმარებელი საიტიდან არ გავიდეს (განსაკუთრებით მნიშვნელოვანია მიმაგრებული ფაილებისთვის)
export function addLinkTargets(html) {
  if (!html) return html;
  return html.replace(/<a\s+(?![^>]*target=)/g, '<a target="_blank" rel="noopener noreferrer" ');
}

// render-წერტილებში გამოსაყენებელი ერთი ფუნქცია: ჯერ სანიტაიზაცია, მერე ბმულის target
export function renderRichHtml(html) {
  return addLinkTargets(sanitizeHtml(html));
}
