import { proxy } from "./proxy";

export const middleware = proxy;

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
