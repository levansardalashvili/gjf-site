import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// გამოსაყენებელია სერვერულ კომპონენტებში/გვერდებზე — მომხმარებლის session-ს
// cookie-დან კითხულობს.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Component-იდან set() ხანდახან ვერ მუშაობს — middleware-ი ისედაც ანახლებს session-ს
          }
        },
      },
    }
  );
}
