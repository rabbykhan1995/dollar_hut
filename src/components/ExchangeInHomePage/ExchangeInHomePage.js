"use client";
import { useEffect, useState } from "react";

const ExchangeInHomePage = () => {
  const getData = async () => {
    const response = await fetch(`${process.env.HOST}/api/exchange/for_home`, {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemPerPage: 10, pageNumber: 1 }),
    });
    const data = await response.json();

    return data;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Right w-full h-full flex flex-col justify-center items-center hover:border border-green-500 rounded-xl">
      <h1>today's USD Rate is Taka per 1 $</h1>
    </div>
  );
};
export default ExchangeInHomePage;
