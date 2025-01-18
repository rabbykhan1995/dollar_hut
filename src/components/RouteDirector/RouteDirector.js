"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { MdPages } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const RouteDirector = () => {
  // Get the current pathname using usePathname hook
  const pathname = usePathname();
  const pathArr = pathname.split("");

  const finalArr = pathArr.filter((elm) => elm !== "/");

  const path = finalArr.join("");
  return (
    <div className="flex gap-6 font-semibold pt-16 items-center">
     
      <h1 className="px-5 flex gap-3"> <MdPages className="text-[30px]" /> Page</h1>
      <FaArrowRight className="text-[20px]" />
      <h1 className="px-7 tracking-wider capitalize">
        {pathname === "/"
          ? "Home"
          : pathname === "/profile/edit"
          ? "Profile Edit"
          : pathname === "/admin_panel"
          ? null
          : path}
      </h1>
    </div>
  );
};

export default RouteDirector;
