import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// გვერდები: /admin/* (login/set-password-ის გარდა) — არაავტორიზებულს login-ზე გადაამისამართებს.
// API-ები: /api/* (login/logout/invite-ის endpoint-ების გარდა, რომლებსაც თავად სჭირდებათ
// უსესიო წვდომა) — არაავტორიზებულს 401-ს დაუბრუნებს.
const PUBLIC_ADMIN_PAGES = ["/admin/login", "/admin/set-password"];
const PUBLIC_API_PATHS = ["/api/admin/login", "/api/admin/logout"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && !PUBLIC_ADMIN_PAGES.includes(pathname);
  const isProtectedApi = pathname.startsWith("/api") && !PUBLIC_API_PATHS.includes(pathname);

  if (!isAdminPage && !isProtectedApi) {
    return NextResponse.next();
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

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
