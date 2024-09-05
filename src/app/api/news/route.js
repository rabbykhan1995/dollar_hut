import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async () => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: 1 },
    });

    return NextResponse.json({ msg: "successfull", result: news });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "sorry something wrong" });
  }
};
