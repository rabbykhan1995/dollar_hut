import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

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
