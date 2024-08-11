import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const POST = async (req) => {
  try {
    const news = await req.json();

    const updatedNews = await prisma.news.update({
      where: {
        id: 1, // Replace with the actual id of the news record you want to update
      },
      data: news,
    });

    return NextResponse.json({ msg: "successfull", result: updatedNews });
  } catch (error) {
    return NextResponse.json({ msg: "sorry something went wrong" });
  }
};

export const GET = async () => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: 1 },
    });

    return NextResponse.json({ msg: "successfull", result: news });
  } catch (error) {
    return NextResponse.json({ msg: "sorry something wrong" });
  }
};
