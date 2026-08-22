import DOMPurify from "isomorphic-dompurify";

// admin-ის Quill რედაქტორს მხოლოდ ეს ტეგები/ატრიბუტები გამოაქვს — დანარჩენი
// (მათ შორის <script>, on*= event handler-ები, javascript: ბმულები) იჭრება.
const ALLOWED_TAGS = [
  "p", "br", "b", "strong", "i", "em", "u", "s", "span",
  "a", "ul", "ol", "li", "img",
];
const ALLOWED_ATTR = ["href", "target", "rel", "style", "src", "alt", "width", "height", "class"];

// admin-ის rich-text ველების (news/events/pages/... body) გამწმენდი — შლის ნებისმიერ
// შესრულებად კოდს (stored XSS-ის თავიდან ასაცილებლად), სანამ HTML DOM-ში მოხვდება.
export function sanitizeHtml(html) {
  if (!html) return html;
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
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
