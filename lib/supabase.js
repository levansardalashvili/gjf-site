import { createClient } from "@supabase/supabase-js";

// საჯარო (public) კლიენტი — მხოლოდ წაკითხვისთვის, საიტის ჩვეულებრივი გვერდები იყენებენ.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// admin (service-role) კლიენტი — მხოლოდ /app/api/**/route.js ფაილებში გამოსაყენებელი!
// SUPABASE_SERVICE_ROLE_KEY არასდროს უნდა მოხვდეს ბრაუზერში/frontend კოდში.
export function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
