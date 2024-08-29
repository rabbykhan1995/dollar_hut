import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="pt-10 text-black h-[70vh] flex justify-center flex-col">
      <LoginForm></LoginForm>
      <section className="text-gray-500 flex flex-col md:flex-row gap-5 justify-center items-center">
        <p className="p-5">
          If you don&apos;t have an account, simply create an account by
          clicking
        </p>

        <Link
          className="border rounded-xl bg-red-400 text-white px-4 py-1"
          href="/register"
        >
          Register
        </Link>
      </section>
    </div>
  );
};

export default Page;
