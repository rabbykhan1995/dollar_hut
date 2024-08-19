import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";

export const POST = async (req) => {
  try {
    const { name, email, old_password, new_password } = await req.json();

    const userId = req.headers.get("user-id");
    const userData = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!userData) {
      return NextResponse.json({ msg: "login first" });
    }
    let updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (email) {
      updateData.email = email;
    }

    if (old_password && new_password) {
      const comparedPassword = await bcrypt.compare(
        old_password,
        userData.password
      );
      if (!comparedPassword) {
        return NextResponse.json(
          { msg: "Old password is incorrect" },
          { status: 401 }
        );
      }
      const hashedPassword = await bcrypt.hash(new_password, 10);
      updateData.password = hashedPassword;
    }

    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: updateData,
    });

    return NextResponse.json({
      name: user.name,
      email: user.email,
      id: user.id,
      gender: user.gender,
      mobile: user.mobile,
      userType: user.userType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "An error occurred while updating the user" },
      { status: 500 }
    );
  }
};
