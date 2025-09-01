// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mảng các route private
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || true;
  const { pathname } = req.nextUrl;

  // Kiểm tra có thuộc route private không
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}