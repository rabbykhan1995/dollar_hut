import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const { itemPerPage = 10, pageNumber = 1 } = await req.json();
    if (typeof itemPerPage !== "number" && typeof pageNumber !== "number") {
      parseInt(itemPerPage);
      parseInt(pageNumber);
    }
    const totalExchange = await prisma.exchange.count();

    const itemArray = await prisma.exchange.findMany({
      skip: (pageNumber - 1) * itemPerPage,
      take: itemPerPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ totalExchange, itemArray });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "error in server" });
  }
};
