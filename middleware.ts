import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import environment from "./config/environment";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  try {
    if (pathname.startsWith("/dashboard")) {
      const token = await getToken({ req, secret: environment.AUTH_SECRET });

      if (!token) {
        const url = new URL("/signin", req.url);
        url.searchParams.set("callbackUrl", decodeURIComponent(req.url));
        return NextResponse.redirect(url);
      }
    }

    if (pathname === "/signin" || pathname === "/signup") {
      const token = await getToken({ req, secret: environment.AUTH_SECRET });
      if (token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
