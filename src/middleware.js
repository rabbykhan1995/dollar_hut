import { NextResponse } from "next/server";
import { verifyToken } from "./utils/Backend/jwt";

export async function middleware(req) {
  let token;
  const authHeader = req.headers.get("authorization");

  // Check for token in Authorization header
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // Check for token in cookies
  if (!token) {
    token = req.cookies.get("token");
  }

  // Define the protected paths
  const protectedPaths = [
    "/api/contact",
    "/api/exchange",
    "/api/profile",
    "/api/admin",
    "/api/profile/edit",
    "/profile",
    "/profile/edit",
    "/admin",
    "/exchange",
    "/contact",
  ];

  // Define the public paths
  const publicPaths = ["/login", "/register"];

  // Check if the request is for one of the protected paths
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If no token found, redirect to login page
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Verify the token
    try {
      const tokenIsVerified = await verifyToken(token.value || token);
      if (!tokenIsVerified) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }

      const { id, email } = tokenIsVerified;

      const response = NextResponse.next();
      response.headers.set("user-id", id);
      response.headers.set("user-email", email);

      return response;
    } catch (error) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } else if (
    publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    // Check if the request is for the login or register page
    if (token) {
      try {
        const tokenIsVerified = await verifyToken(token.value || token);
        if (tokenIsVerified) {
          // Redirect to profile if token is valid
          const url = req.nextUrl.clone();
          url.pathname = "/profile";
          return NextResponse.redirect(url);
        }
      } catch (error) {
        // If token verification fails, proceed to login or register page
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/contact",
    "/api/profile",
    "/api/admin",
    "/api/profile/edit",
    "/api/exchange",
    "/profile",
    "/profile/edit",
    "/admin",
    "/login",
    "/register",
    "/exchange",
    "/contact",
  ],
};
