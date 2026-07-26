import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the pathname is exactly "/", redirect to the default locale "/fa"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/fa", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
