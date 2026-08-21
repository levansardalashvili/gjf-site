// rich text-ის ბმულებს ამატებს target="_blank" — რომ დაკლიკებისას
// მომხმარებელი საიტიდან არ გავიდეს (განსაკუთრებით მნიშვნელოვანია მიმაგრებული ფაილებისთვის)
export function addLinkTargets(html) {
  if (!html) return html;
  return html.replace(/<a\s+(?![^>]*target=)/g, '<a target="_blank" rel="noopener noreferrer" ');
}
