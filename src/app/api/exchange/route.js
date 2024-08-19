import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const POST = async (req) => {
  try {
    const userId = req.headers.get("user-id");

    const clientData = await req.json();
    const {
      requestedWithBank,
      requestedForBank,
      amount,
      method,
      requestedWithBankDetails,
      requestedForBankDetails,
    } = clientData;

    // Fetch rates from the database
    const buyingRates = await prisma.buying_rates.findUnique({
      where: { id: 1 },
    });

    const sellingRates = await prisma.selling_rates.findUnique({
      where: { id: 1 },
    });

    let rate = 0;

    if (method === "t") {
      // Taka to Dollar
      rate = buyingRates[requestedForBank];
    } else {
      // Dollar to Taka
      rate = sellingRates[requestedWithBank];
    }

    if (rate === undefined || rate === 0) {
      return NextResponse.json({ msg: "Rate not available" });
    }

    // Calculate onRate based on the method and rate
    const onRate = rate;

    const data = {
      state: "Applied",
      amount: parseInt(amount),
      requesterId: parseInt(userId),
      requestedFor: method === "t" ? "Dollar" : "Taka",
      requestedWith: method === "t" ? "Taka" : "Dollar",
      requestedWithBank,
      requestedForBank,
      onRate: parseInt(onRate.toFixed(2)),
      requestedWithBankDetails,
      requestedForBankDetails,
    };

    const createOrder = await prisma.exchange.create({
      data,
    });

    if (!createOrder) {
      return NextResponse.json({ msg: "No order created" });
    }

    return NextResponse.json({ msg: "Successful", result: createOrder });
  } catch (error) {
    return NextResponse.json({ msg: "Error in server" });
  }
};
