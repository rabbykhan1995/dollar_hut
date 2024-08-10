import { verifyToken } from "@/utils/Backend/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie.value;
    const verifiedToken = await verifyToken(token);
    const { id } = verifiedToken;
    return NextResponse.json({ msg: "Successful", result: id });
  } catch (error) {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};
