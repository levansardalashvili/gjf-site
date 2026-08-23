import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// production-ისთვის: Upstash Redis (უფასო ტარიფი) — ცენტრალიზებული საცავი,
// რომელსაც ყველა Vercel serverless ფუნქციის ასლი ერთნაირად ხედავს. გამართვა
// README-შია ("Rate limiting-ის გამართვა").
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    : null;

// მარტივი in-memory fallback — თუ Upstash ჯერ არ გაქვს გამართული (ლოკალურ
// დეველოპმენტში, ან პროექტის დაწყებისას). Vercel-ის serverless გარემოში ეს
// რეალურად სუსტია (თითოეულ ფუნქციის ასლს განცალკევებული მეხსიერება აქვს),
// მაგრამ სულ არაფერი ჯობია — ამიტომ production-ზეც fallback-ად ტოვდება.
const buckets = new Map();
function isRateLimitedInMemory(key, { windowMs, max }) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

// windowMs/max წყვილის მიხედვით ერთხელ ვქმნით Ratelimit instance-ს და ვიმეორებთ
// გამოყენებას — არა ყოველ მოთხოვნაზე ახლის შექმნას.
const limiters = new Map();
function getLimiter(windowMs, max) {
  const cacheKey = `${windowMs}:${max}`;
  if (!limiters.has(cacheKey)) {
    limiters.set(
      cacheKey,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(max, `${Math.max(1, Math.round(windowMs / 1000))} s`),
        prefix: "gjf-ratelimit",
      })
    );
  }
  return limiters.get(cacheKey);
}

export async function isRateLimited(key, { windowMs = 60_000, max = 20 } = {}) {
  if (!redis) return isRateLimitedInMemory(key, { windowMs, max });
  try {
    const { success } = await getLimiter(windowMs, max).limit(key);
    return !success;
  } catch (err) {
    // Upstash დროებით მიუწვდომელია (outage/timeout) — საჯარო endpoint (საკონტაქტო
    // ფორმა, ძებნა) არ უნდა ჩავარდეს ამის გამო. in-memory fallback-ზე გადავდივართ
    // ამ ერთი მოთხოვნისთვის, სრულ გაუქმებამდე (fail-open) წასვლის ნაცვლად.
    console.error("Upstash rate limit check failed, falling back to in-memory:", err);
    return isRateLimitedInMemory(key, { windowMs, max });
  }
}
