import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import environment from "./config/environment";

const publicRoutes = ["/signin", "/signup"];
const protectedRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: environment.AUTH_SECRET });

  if ((pathname === "/signin" || pathname === "/signup") && token) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const url = new URL("/signin", req.url);
    const callbackUrl = decodeURIComponent(req.url);
    url.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
