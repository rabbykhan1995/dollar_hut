import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const POST = async (req) => {
  try {
    const clientData = await req.json();
    const { method, date, state } = clientData;
    console.log(clientData);
    let filter = {};
    // it denotes that, if method is 't',means method starts with Taka ..if 'b' then it will out of the loop...
    if (method === "t" && method !== "b") {
      filter.requestedWith = "Taka";
      filter.requestedFor = "Dollar";
    } else if (method === "d" && method !== "b") {
      filter.requestedWith = "Dollar";
      filter.requestedFor = "Taka";
    }

    if (state !== "All") {
      filter.state = state;
    }

    // Filter based on date
    if (date) {
      filter.createdAt = {
        gte: new Date(date),
        lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      };
    }

    const orderArray = await prisma.exchange.findMany({ where: filter });

    if (orderArray.length === 0) {
      return NextResponse.json({ msg: "no order found" });
    }

    return NextResponse.json({
      msg: "Order founded",
      result: orderArray,
    });
  } catch (error) {
    return NextResponse.json({ msg: "error" });
  }
};
