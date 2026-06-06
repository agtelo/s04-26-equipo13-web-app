import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Redirect root based on authentication
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect dashboard, history, and editor routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/history") || pathname.startsWith("/editor")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",                 
    "/dashboard/:path*",
    "/history/:path*",
    "/editor/:path*",
    "/login",
    "/register",
    "/forgot-password/:path*",
    "/new-password/:path*",
  ],
};
