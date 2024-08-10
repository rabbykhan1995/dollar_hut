import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import WebsiteLogo from "@/Icons/WebsiteLogo";

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:justify-around text-center text-sm mt-10 bg-[#1d1e7a] p-5 border-t-4 border-green-500">
      <WebsiteLogo />

      <div className="flex flex-col gap-5">
        <h1 className="text-xl">About US</h1>
        <ul className="flex flex-col gap-3">
          <li>Term & Conditions</li>
          <li>Privacy & Policy</li>
          <li>Top News</li>
          <Link href={"/contact"}>Contact Us</Link>
        </ul>
      </div>
      <div className="flex sm:flex-row flex-col  gap-5 self-center">
        <h1>Follow Us on</h1>
        <div className="flex  gap-5 text-2xl">
          <FaFacebookF />

          <SiWhatsapp />
          <FaYoutube />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default Footer;
