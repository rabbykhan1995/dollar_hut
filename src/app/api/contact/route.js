import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  const userId = req.headers.get("user-id");
  const userEmail = req.headers.get("user-email");

  const { email, message } = await req.json();

  const contact = await prisma.contact.create({
    data: {
      email: email,
      message: message,
      senderId: parseInt(userId),
    },
  });

  return NextResponse.json({ msg: "successfull", result: contact });
};

export const GET = async (req) => {
  const userId = req.headers.get("user-id");
  const userEmail = req.headers.get("user-email");

  return NextResponse.json({ msg: "successfull", result: userEmail });
};
