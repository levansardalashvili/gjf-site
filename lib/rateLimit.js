// მარტივი, in-memory rate limiter — გარე სერვისის გარეშე.
// შენიშვნა: ეს იმახსოვრებს მონაცემს მხოლოდ ერთი სერვერული ფუნქციის "თბილ" ხანგრძლივობაში
// (Vercel-ის serverless გარემოში ეს იდეალური არ არის, მაგრამ საბაზისო დაცვას იძლევა
// მარტივი, ავტომატური ბოროტად გამოყენების წინააღმდეგ — დამატებითი ინფრასტრუქტურის გარეშე).
const buckets = new Map();

export function isRateLimited(key, { windowMs = 60_000, max = 20 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return false;
  }

  entry.count += 1;
  if (entry.count > max) return true;
  return false;
}
