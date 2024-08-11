import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const POST = async (req) => {
  const userId = req.headers.get("user-id");

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
