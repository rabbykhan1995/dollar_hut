import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/Backend/jwt";
import prisma from "../../../../../lib/prisma";

export async function POST(req) {
  try {
    const credential = await req.json();
    const { identifier, password } = credential;

    const user = await prisma.user.findUnique({
      where: {
        email: identifier,
      },
    });

    if(user.openId){
      return NextResponse.json({msg:"login with google"}, {status:203});
    }

    if (!user) {
      return NextResponse.json(
        { msg: "authentication failed" },
        { status: 404 }
      );
    }

    const hashedPassword = user.password;
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      return NextResponse.json(
        { msg: "authentication failed" },
        { status: 400 }
      );
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      userType: user.userType,
    });

    return NextResponse.json(
      {
        name: user.name,
        email: user.email,
        id: user.id,
        userType: user.userType,
        mobile: user.mobile,
        gender: user.gender,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ msg: "authentication failed" }, { status: 500 });
  }
}
