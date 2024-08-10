import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const user = await req.json();
    const { name, email, mobile, gender, password } = user;

    if (!name || !email || !mobile || !gender || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
          status: 400,
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        mobile: parseInt(mobile),
      },
    });

    return NextResponse.json({ user: newUser, status: 201 });
  } catch (error) {
    console.log("Error in server at api/auth/manual -", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        status: 500,
      },
      { status: 500 }
    );
  }
}
