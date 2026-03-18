import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If no token and trying to access dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token) {
    const user = await verifyJwt(token);

    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Admin Route Protection
    if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    // Provider Route Protection
    if (pathname.startsWith("/dashboard/provider") && user.role !== "provider") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    // Customer Route Protection
    if (pathname.startsWith("/dashboard/customer") && user.role !== "customer") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};