"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoCloseSharp, IoHome } from "react-icons/io5";
import Link from "next/link";
import { MdRateReview, MdEmail, MdMenuOpen } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { BsCurrencyExchange } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "@/utils/Frontend/store/user/userSlice";

const MenuButton = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);
  const clickHandler = () => {
    setShow(!show);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { cache: "no-cache" });
    dispatch(logout());
    dispatch(resetState());
  };

  return (
    <>
      <button
        className="flex lg:hidden px-5 py-1 w-screen font-bold text-3xl"
        onClick={clickHandler}
      >
        {show ? <IoCloseSharp /> : <MdMenuOpen />}
      </button>

      {show ? (
        <div
          ref={menuRef}
          className="fixed flex flex-col gap-5 px-4 py-2 bg-[#cc6c5c]  w-screen top-9 rounded-xl"
        >
          <h1>
            <Link className="flex gap-2 hover:bg-zinc-700" href={"/"}>
              <IoHome className="text-2xl" /> <span>Home</span>
            </Link>
          </h1>
          <h1>
            <Link className="flex gap-2 hover:bg-zinc-700" href={"/review"}>
              <MdRateReview className="text-2xl" /> <span>Review</span>
            </Link>
          </h1>
          {user ? (
            <h1>
              <Link href={"/contact"} className="flex gap-2 hover:bg-zinc-700">
                <MdEmail className="text-2xl" /> <span>Contact Us</span>
              </Link>
            </h1>
          ) : null}
          <h1>
            <Link href={"/news"} className="flex gap-2 hover:bg-zinc-700">
              <FaNewspaper className="text-2xl" /> <span>News</span>
            </Link>
          </h1>
          {user ? (
            <h1>
              <Link href={"/exchange"} className="flex gap-2 hover:bg-zinc-700">
                <BsCurrencyExchange className="text-2xl" />
                <span>Exchange</span>
              </Link>
            </h1>
          ) : null}
          <h1>
            {status === "loading" && <span>Loading...</span>}
            {status === "succeeded" && user && (
              <>
                {user.userType === "normal" ? (
                  <div className="flex  gap-2">
                    <Link
                      href="/profile"
                      className="bg-yellow-700 rounded-full flex justify-center items-center px-3"
                    >
                      {user.name
                        .split("")
                        .map((l, i) => (i === 0 ? l.toUpperCase() : null))}
                    </Link>
                    <button
                      className="bg-violet-900 px-2 py-1 hover:bg-violet-800 rounded-xl"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                ) : user.userType === "admin" ? (
                  <div className="flex gap-5">
                    <Link
                      href="/admin_panel"
                      className="bg-gray-950 text-white px-2 py-1 rounded-xl hover:bg-gray-800"
                    >
                      Admin Panel
                    </Link>
                    <button
                      className="bg-violet-900 px-2 py-1 hover:bg-violet-800 rounded-xl"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                ) : null}
              </>
            )}
            {(status === "idle" || !user) && (
              <Link
                href="/login"
                className="border px-5 py-1 bg-slate-50 text-black rounded-xl"
              >
                Login
              </Link>
            )}
          </h1>
        </div>
      ) : null}
    </>
  );
};

export default MenuButton;
