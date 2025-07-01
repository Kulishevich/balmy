import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/authorization"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthPage = PUBLIC_PATHS.includes(request.nextUrl.pathname);
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated && request.nextUrl.pathname === "/authorization") {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/authorization", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
