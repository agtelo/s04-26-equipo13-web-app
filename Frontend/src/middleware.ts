import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Si intenta acceder a rutas protegidas sin token
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/editor")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Si intenta acceder a login/register CON token, redirige a dashboard
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protege estas rutas
    "/dashboard/:path*",
    "/editor/:path*",
    // Pero permite acceso público a login/register
    "/login",
    "/register",
  ],
};