import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";
import { generateToken } from "@/utils/Backend/jwt";

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
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        mobile,
      },
    });

    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      userType: newUser.userType,
    });

    return NextResponse.json(
      {
        email: newUser.email,
        name: newUser.name,
        gender: newUser.gender,
        id: newUser.id,
        mobile: newUser.mobile,
        userType: newUser.userType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
