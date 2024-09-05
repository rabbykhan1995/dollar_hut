import { NextResponse } from "next/server";
import { verifyToken } from "./utils/Backend/jwt";

export async function middleware(req) {
  let token;
  const authHeader = req.headers.get("authorization");

  // Check for token in Authorization header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Check for token in cookies if not in header
  if (!token) {
    const cookieToken = req.cookies.get("token");
    if (cookieToken) {
      token = cookieToken.value || cookieToken;
    }
  }

  // Verify token if it exists
  let tokenIsVerified = null;
  if (token) {
    tokenIsVerified = await verifyToken(token);
  }

  // Define the paths
  const protectedPaths = [
    "/api/contact",
    "/api/exchange",
    "/api/profile",
    "/api/profile/edit",
    "/profile",
    "/profile/edit",
    "/exchange",
    "/contact",
  ];
  const publicPaths = ["/login", "/register"];
  const adminPaths = [
    "/admin_panel",
    "/admin_panel/rates",
    "/admin_panel/news",
    "/admin_panel/orders",
    "/admin_panel/pages/contact",
    "/admin_panel/pages/order",
    "/admin_panel/pages/exchange",
    "/admin_panel/customize_page/contact",
    "/api/admin_panel",
    "/api/admin_panel/rates",
    "/api/admin_panel/customize_page/contact",
    "/api/admin_panel/customize_page/exchange",
    "/api/admin_panel/customize_page/home",
    "/api/admin_panel/customize_page/news",
    "/api/admin_panel/customize_page/orders",
    "/api/admin_panel/orders",
  ];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token || !tokenIsVerified) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      const response = NextResponse.redirect(url);
      response.cookies.delete("token");
      return response;
    }

    const { id, email, userType } = tokenIsVerified;
    const response = NextResponse.next();
    response.headers.set("user-id", id);
    response.headers.set("user-email", email);
    response.headers.set("user-type", userType);
    return response;
  } else if (
    publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    if (tokenIsVerified) {
      const url = req.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else if (adminPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (tokenIsVerified?.userType === "normal") {
      const url = req.nextUrl.clone();
      url.pathname = "/unauthorized";
      const response = NextResponse.redirect(url);
      return response;
    } else if (tokenIsVerified?.userType === "admin") {
      const { id, email, userType } = tokenIsVerified;
      const response = NextResponse.next();
      response.headers.set("user-id", id);
      response.headers.set("user-email", email);
      response.headers.set("user-type", userType);
      return response;
    }
  }
}

export const config = {
  matcher: [
    "/api/contact",
    "/api/profile",
    "/api/profile/edit",
    "/api/exchange",
    "/profile",
    "/profile/edit",
    "/admin_panel/:path*",
    "/admin_panel",
    "/api/admin_panel/:path*",
    "/login",
    "/register",
    "/exchange",
    "/contact",
  ],
};
