import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdministrator, verifyToken } from "@/lib/utils/auth";

const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];

export async function middleware(req: NextRequest) {
  const isAuthenticated = await verifyToken();

  // administator routes can only be accessed by me
  if (!isAuthenticated && adminRoutes.includes(req.nextUrl.pathname)) {
    const isAdmin = await isAdministrator();
    if (!isAdmin) {
      const absoluteURL = new URL("/not-found", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
  // protected routes can only be accessed by logged in users
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    // Append the original pathname as a query parameter
    absoluteURL.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
