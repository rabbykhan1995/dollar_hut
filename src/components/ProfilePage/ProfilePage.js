"use client";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpin/LoadingSpin";

const ProfilePage = () => {
  const { user, status, error } = useSelector((state) => state.user);

  return (
    <div className="flex m-10 h-[70vh] justify-center items-baseline flex-col gap-5  font-serif capitalize tracking-widest rounded-2xl">
      <h1 className="flex justify-center items-center gap-10">
        name :{status === "succeeded" ? user.name : <LoadingSpinner />}
      </h1>
      <h1 className="flex justify-center items-center gap-10">
        email : {status === "succeeded" ? user.email : <LoadingSpinner />}
      </h1>
      <h1 className="flex justify-start items-center gap-10">
        gender : {status === "succeeded" ? user.gender : <LoadingSpinner />}
      </h1>
      <h1 className="flex justify-center items-center gap-10">
        mobile : {status === "succeeded" ? user.mobile : <LoadingSpinner />}
      </h1>

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
