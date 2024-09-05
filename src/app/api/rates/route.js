import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async () => {
  try {
    const buyingRates = await prisma.buying_rates.findFirst();
    const sellingRates = await prisma.selling_rates.findFirst();

    return NextResponse.json({
      msg: "Success",
      result: { buyingRates, sellingRates },
    });
  } catch (error) {
    console.error("GET /api/admin_panel/rates error:", error.message);

    return NextResponse.json({
      msg: "Failed to retrieve rates",
      error: error.message,
    });
  }
};
