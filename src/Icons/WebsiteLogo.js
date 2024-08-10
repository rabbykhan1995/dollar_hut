import Link from "next/link";
import React from "react";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

const WebsiteLogo = () => {
  return (
    <div className="flex justify-center items-center">
      <Link
        href={"/"}
        className="flex justify-center items-center text-xl font-mono"
      >
        <span>
          <PiCurrencyDollarSimpleBold />
        </span>
        <h1>
          <span className="text-orange-500">Dollar </span> Hut
        </h1>
      </Link>
    </div>
  );
};

export default WebsiteLogo;
