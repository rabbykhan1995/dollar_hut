"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const SideBarAccordian = ({ obj }) => {
  const { title, items, logo } = obj;
  const [show, setShow] = useState(false);
  const [itemsArray, setItemArray] = useState([]);

  useEffect(() => {
    show ? setItemArray(items) : setItemArray([]);
  }, [show, items]);

  return (
    <div className="capitalize">
      <div className="flex gap-2">
        {logo && <span className="flex items-center text-lg">{logo}</span>}
        <button
          className="flex justify-center items-center gap-4 hover:bg-slate-500"
          onClick={() => {
            setShow(!show);
          }}
        >
          <span>{title}</span>
          {show ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </div>

      <div className=" flex flex-col gap-5 font-mono">
        {items.map((item, index) => {
          return (
            <div
              className={`${
                show ? "flex" : "hidden"
              } pl-8 items-center hover:bg-stone-500`}
              key={index}
            >
              <Link href={`/admin_panel/pages/${item === "home" ? "" : item}`}>
                {item}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBarAccordian;
