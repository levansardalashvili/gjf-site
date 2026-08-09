import { NextResponse } from "next/server";

// იცავს ყველა /admin/* გვერდს, გარდა /admin/login-ისა.
// შემოწმებას აკეთებს მარტივი httpOnly cookie-თი (იხ. app/api/admin/login/route.js).
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("gjf_admin_session");
    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
