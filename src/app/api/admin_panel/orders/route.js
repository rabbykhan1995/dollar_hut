import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const POST = async (req) => {
  const clientData = await req.json();
  const { method, to, from, date, showby, state } = clientData;
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

  if (date !== "") {
    filter.createdAt = new Date(date);
  }
  console.log("filter", filter);
  const orderArray = await prisma.exchange.findMany({ where: filter });

  if (orderArray.length === 0) {
    return NextResponse.json({ msg: "no order found" });
  }

  return NextResponse.json({
    msg: "Order founded",
    result: orderArray,
  });
};
