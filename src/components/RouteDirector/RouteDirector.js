"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const RouteDirector = () => {
  // Get the current pathname using usePathname hook
  const pathname = usePathname();
  const pathArr = pathname.split("");

  const finalArr = pathArr.filter((elm) => elm !== "/");

  const path = finalArr.join("");
  return (
    <div className="flex gap-10 pt-14">
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
