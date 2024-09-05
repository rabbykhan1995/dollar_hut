"use client";

import Link from "next/link";
import SideBarAccordian from "./SideBarAccordian";
import {
  MdOutlineSettings,
  MdOutlineDashboardCustomize,
  MdRateReview,
  MdMessage,
  MdPeople,
  MdCurrencyExchange,
} from "react-icons/md";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import { useState } from "react";

const SideBar = () => {
  const [show, setShow] = useState(false);

  return (
    <aside
      className={` h-screen justify-center gap-5  items-center flex absolute sm:static overflow-y-auto overflow-x-hidden ${
        show ? "bg-slate-700" : ""
      } `}
    >
      <button
        className="text-3xl"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? <LuPanelLeftClose /> : <LuPanelLeftOpen />}
      </button>
      <ul
        className={`${
          show ? "flex" : "hidden"
        } flex-col gap-5 w-[60vw] sm:w-[30vw] `}
      >
        <SideBarAccordian
          obj={{
            title: "Customize Pages",
            items: ["home", "news", "contact", "order", "exchange"],
            logo: <MdOutlineDashboardCustomize />,
          }}
        />
        <Link href={"/admin_panel/rates"} className="flex gap-3 items-center">
          <span>
            <MdRateReview />
          </span>
          <span>Rates</span>
        </Link>
        <li className="flex gap-3 items-center">
          <span>
            <MdMessage />
          </span>
          <span>Message</span>
        </li>
        <li className="flex gap-3 items-center">
          <span>
            <MdPeople />
          </span>
          <span>Visitor</span>
        </li>
        <Link href={"/admin_panel/orders"} className="flex gap-3 items-center">
          <span>
            <MdCurrencyExchange />
          </span>
          <span>Orders</span>
        </Link>

        <SideBarAccordian
          obj={{
            title: "Settings",
            items: ["nunu", "putki"],
            logo: <MdOutlineSettings />,
          }}
        />
      </ul>
    </aside>
  );
};
export default SideBar;
