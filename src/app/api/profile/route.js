import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  const userId = req.headers.get("user-id");
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (!user) {
    return NextResponse.json({ msg: "no data found" });
  }
  return NextResponse.json(user);
}
