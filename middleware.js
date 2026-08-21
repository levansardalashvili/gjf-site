import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// გვერდები: /admin/* (login/set-password-ის გარდა) — არაავტორიზებულს login-ზე გადაამისამართებს.
// API-ები: /api/* (login/logout/invite-ის endpoint-ების გარდა, რომლებსაც თავად სჭირდებათ
// უსესიო წვდომა) — არაავტორიზებულს 401-ს დაუბრუნებს.
const PUBLIC_ADMIN_PAGES = ["/admin/login", "/admin/set-password", "/admin/mfa-challenge"];
const PUBLIC_API_PATHS = ["/api/search", "/api/contact-messages"];

export async function middleware(request, event) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && !PUBLIC_ADMIN_PAGES.includes(pathname);
  const isProtectedApi = pathname.startsWith("/api") && !PUBLIC_API_PATHS.includes(pathname);

  if (!isAdminPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // CSRF-დაცვა — ცვლილების მოთხოვნებზე (POST/PUT/DELETE) ვამოწმებთ, რომ Origin
  // header ჩვენივე საიტს ემთხვევა. სხვა საიტიდან "ჩუმად" გამოგზავნილი მოთხოვნა
  // (CSRF შეტევა) ამ ეტაპზევე იბლოკება, ავთენტიფიკაციის შემოწმებამდე.
  const isMutation = ["POST", "PUT", "DELETE"].includes(request.method);
  if (isProtectedApi && isMutation) {
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== request.nextUrl.host) {
      return NextResponse.json({ error: "მოთხოვნა უცნობი წყაროდან — უარყოფილია" }, { status: 403 });
    }
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "არაავტორიზებული წვდომა" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 2FA (ორფაქტორიანი დადასტურება) — თუ admin-მა ჩართო, მაგრამ ჯერ არ დაუდასტურებია
  // ამ სესიაში, აქეთ არსად არ გაუშვათ, სანამ კოდს არ შეიყვანს.
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal && aal.nextLevel === "aal2" && aal.currentLevel !== aal.nextLevel) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "საჭიროა ორფაქტორიანი დადასტურება" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/mfa-challenge", request.url));
  }

  // Admin-ის მოქმედებების ისტორია — მხოლოდ ცვლილების მოთხოვნებზე (POST/PUT/DELETE),
  // fire-and-forget: ჩავარდნა არასდროს ბლოკავს/აფერხებს რეალურ მოქმედებას.
  if (isProtectedApi && isMutation && pathname !== "/api/upload" && pathname !== "/api/translate") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      const logPromise = fetch(`${supabaseUrl}/rest/v1/activity_log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ admin_email: user.email, method: request.method, path: pathname }),
      }).catch(() => {});
      event?.waitUntil?.(logPromise);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
