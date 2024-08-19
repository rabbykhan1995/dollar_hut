"use client";
import { useEffect, useState } from "react";
import MenuButton from "../Buttons/MenuButton";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetState } from "@/utils/Frontend/store/user/userSlice";

const Navbar = () => {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { cache: "no-cache" });
    dispatch(logout());
    dispatch(resetState());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`Nav_Container flex flex-col gap-5 fixed w-screen bg-[#0077dd] px-5 py-2 tracking-wider font-mono transition-transform duration-300 ${
        isNavbarVisible
          ? "transform translate-y-0"
          : "transform -translate-y-full"
      }`}
    >
      <MenuButton />

      <ul className="hidden lg:flex justify-between py-1 px-5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/review">Review</Link>
        </li>
        {user ? (
          <li>
            <Link href="/exchange">Exchange</Link>
          </li>
        ) : null}
        <li>
          <Link href="/news">News</Link>
        </li>
        {user ? (
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        ) : null}
        <li>
          {status === "loading" && <span>Loading...</span>}
          {status === "succeeded" && user && (
            <>
              {user.userType === "normal" ? (
                <div className="flex gap-5">
                  <Link
                    href="/profile"
                    className="bg-orange-700 rounded-full flex justify-center items-center px-3"
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
          {(status === "idle" || !user) && <Link href="/login">Login</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
