import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Backend/jwt";
import prisma from "../../../../lib/prisma";

export const GET = async (req) => {
  let token;
  const authHeader = req.headers.get("authorization");

  // Check for token in Authorization header
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // Check for token in cookies
  if (!token) {
    token = req.cookies.get("token")?.value;
  }

  if (!token) {
    return NextResponse.json(
      { error: "User is not logged in, no token provided" },
      { status: 401 }
    );
  }

  try {
    const tokenIsVerified = await verifyToken(token);

    if (!tokenIsVerified) {
      return NextResponse.json(
        { error: "User is not logged in, token is invalid" },
        { status: 401 }
      );
    }

    const { id } = tokenIsVerified;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        name: true,
        gender: true,
        email: true,
        mobile: true,
        userType: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
