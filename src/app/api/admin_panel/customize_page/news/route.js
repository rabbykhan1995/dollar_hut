import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export const POST = async (req) => {
  try {
    const news = await req.json();

    const newsFounded = await prisma.news.findUnique({ where: { id: 1 } });

    if (!newsFounded) {
      const createNews = await prisma.news.create({
        data: news,
      });

      return NextResponse.json({
        msg: "successfully created",
        result: createNews,
      });
    }

    const updatedNews = await prisma.news.update({
      where: {
        id: 1, // Replace with the actual id of the news record you want to update
      },
      data: news,
    });

    return NextResponse.json({
      msg: "successfully updated",
      result: updatedNews,
    });
  } catch (error) {
    return NextResponse.json({ msg: "sorry something went wrong" });
  }
};
