import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

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

export const PATCH = async (req) => {
  try {
    // Parse request body
    const { newBuyingRates, newSellingRates } = await req.json();

    // Initialize objects to hold the data to be updated
    let updateBuyingRates = {};
    let updateSellingRates = {};

    // Process and parse the new buying rates, only include valid fields
    if (newBuyingRates) {
      if (newBuyingRates.payeer !== "" && newBuyingRates.payeer !== undefined) {
        updateBuyingRates.payeer = parseInt(newBuyingRates.payeer);
      }
      if (
        newBuyingRates.ethereum !== "" &&
        newBuyingRates.ethereum !== undefined
      ) {
        updateBuyingRates.ethereum = parseInt(newBuyingRates.ethereum);
      }
      if (
        newBuyingRates.litecoin !== "" &&
        newBuyingRates.litecoin !== undefined
      ) {
        updateBuyingRates.litecoin = parseInt(newBuyingRates.litecoin);
      }
      if (
        newBuyingRates.dogecoin !== "" &&
        newBuyingRates.dogecoin !== undefined
      ) {
        updateBuyingRates.dogecoin = parseInt(newBuyingRates.dogecoin);
      }
      if (
        newBuyingRates.perfectmoney !== "" &&
        newBuyingRates.perfectmoney !== undefined
      ) {
        updateBuyingRates.perfectmoney = parseInt(newBuyingRates.perfectmoney);
      }
      if (newBuyingRates.pyypl !== "" && newBuyingRates.pyypl !== undefined) {
        updateBuyingRates.pyypl = parseInt(newBuyingRates.pyypl);
      }
      if (
        newBuyingRates.shibcoin !== "" &&
        newBuyingRates.shibcoin !== undefined
      ) {
        updateBuyingRates.shibcoin = parseInt(newBuyingRates.shibcoin);
      }
      if (newBuyingRates.tether !== "" && newBuyingRates.tether !== undefined) {
        updateBuyingRates.tether = parseInt(newBuyingRates.tether);
      }
      if (
        newBuyingRates.troncoin !== "" &&
        newBuyingRates.troncoin !== undefined
      ) {
        updateBuyingRates.troncoin = parseInt(newBuyingRates.troncoin);
      }
      if (
        newBuyingRates.webmoney !== "" &&
        newBuyingRates.webmoney !== undefined
      ) {
        updateBuyingRates.webmoney = parseInt(newBuyingRates.webmoney);
      }
    }

    // Process and parse the new selling rates, only include valid fields
    if (newSellingRates) {
      if (
        newSellingRates.payeer !== "" &&
        newSellingRates.payeer !== undefined
      ) {
        updateSellingRates.payeer = parseInt(newSellingRates.payeer);
      }
      if (
        newSellingRates.ethereum !== "" &&
        newSellingRates.ethereum !== undefined
      ) {
        updateSellingRates.ethereum = parseInt(newSellingRates.ethereum);
      }
      if (
        newSellingRates.litecoin !== "" &&
        newSellingRates.litecoin !== undefined
      ) {
        updateSellingRates.litecoin = parseInt(newSellingRates.litecoin);
      }
      if (
        newSellingRates.dogecoin !== "" &&
        newSellingRates.dogecoin !== undefined
      ) {
        updateSellingRates.dogecoin = parseInt(newSellingRates.dogecoin);
      }
      if (
        newSellingRates.perfectmoney !== "" &&
        newSellingRates.perfectmoney !== undefined
      ) {
        updateSellingRates.perfectmoney = parseInt(
          newSellingRates.perfectmoney
        );
      }
      if (newSellingRates.pyypl !== "" && newSellingRates.pyypl !== undefined) {
        updateSellingRates.pyypl = parseInt(newSellingRates.pyypl);
      }
      if (
        newSellingRates.shibcoin !== "" &&
        newSellingRates.shibcoin !== undefined
      ) {
        updateSellingRates.shibcoin = parseInt(newSellingRates.shibcoin);
      }
      if (
        newSellingRates.tether !== "" &&
        newSellingRates.tether !== undefined
      ) {
        updateSellingRates.tether = parseInt(newSellingRates.tether);
      }
      if (
        newSellingRates.troncoin !== "" &&
        newSellingRates.troncoin !== undefined
      ) {
        updateSellingRates.troncoin = parseInt(newSellingRates.troncoin);
      }
      if (
        newSellingRates.webmoney !== "" &&
        newSellingRates.webmoney !== undefined
      ) {
        updateSellingRates.webmoney = parseInt(newSellingRates.webmoney);
      }
    }

    // Update the database with the valid fields if they exist
    let updatedBuyingRates = null;
    let updatedSellingRates = null;

    if (Object.keys(updateBuyingRates).length > 0) {
      updatedBuyingRates = await prisma.buying_rates.update({
        where: { id: 1 },
        data: updateBuyingRates,
      });
    }

    if (Object.keys(updateSellingRates).length > 0) {
      updatedSellingRates = await prisma.selling_rates.update({
        where: { id: 1 },
        data: updateSellingRates,
      });
    }

    // Return response
    if (!updatedBuyingRates && !updatedSellingRates) {
      return NextResponse.json({
        msg: "No valid fields to update",
      });
    }

    return NextResponse.json({
      msg: "Success",
      result: {
        buyingRates: updatedBuyingRates,
        sellingRates: updatedSellingRates,
      },
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Failed to update rates",
    });
  }
};
