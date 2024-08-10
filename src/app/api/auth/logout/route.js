import { NextResponse } from "next/server";

export const GET = async (req) => {
  const response = NextResponse.json({ msg: "logout successfully" });
  response.cookies.set("token", "", { maxAge: -1, path: "/" }); //clear the cookie
  response.headers.delete("user-id");
  response.headers.delete("user-email");
  response.headers.set("authorization", "");
  return response;
};
