"use client";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const router = useRouter();
  const { user, status, error } = useSelector((state) => state.user);

  return (
    <div className="flex m-10 h-[70vh] justify-center items-center flex-col gap-5 hover:border-4 hover:border-green-600 font-serif capitalize tracking-widest rounded-2xl">
      <h1>name : {user ? user.name : null}</h1>
      <h1 className="flex">
        email : <span className="lowercase"> {user ? user.email : null}</span>{" "}
      </h1>
      <h1>gender : {user ? user.gender : null}</h1>
      <h1>mobile : {user ? user.mobile : null}</h1>

      <Link
        href={"/profile/edit"}
        className="mt-10 bg-green-600 rounded-xl  px-4 py-1 hover:bg-slate-800 flex gap-2 justify-center items-center"
      >
        <span>Edit Profile</span> <MdEdit />
      </Link>
    </div>
  );
};

export default ProfilePage;
