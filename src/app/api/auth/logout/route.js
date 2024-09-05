import { NextResponse } from "next/server";

export const GET = async (req) => {
  // Clone the URL and set the pathname to the login page
  const url = req.nextUrl.clone();
  url.pathname = "/login";

  // Create a response object with a redirect to the login page
  const response = NextResponse.redirect(url);

  // Clear the token cookie
  response.cookies.set("token", "", { maxAge: -1, path: "/" });

  // Remove user-related headers
  response.headers.delete("user-id");
  response.headers.delete("user-email");
  response.headers.delete("authorization");

  // Return the response with the cookie and headers set
  return response;
};
