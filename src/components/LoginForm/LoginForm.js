"use client";

import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/utils/Frontend/store/user/userThunks"; // Adjust the import path if necessary

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { status, user } = useSelector((state) => state.user); // Adjust the state selector if necessary

  const [google, setGoogle] = useState([]);

  const googleRequestFunction = async () => {
      try {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;
        console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, process.env.NEXT_PUBLIC_REDIRECT_URI
        )
      } catch (error) { 
        console.log(error);
      }
  }

  const [credential, setCredential] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credential));
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  // Extract the complex dependency expression
  const isSucceeded = status === "succeeded";

  useEffect(() => {
    if (isSucceeded) {
      router.push("/profile");
    }
  }, [isSucceeded, router]); // Include `isSucceeded` and `router` in the dependency array

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 items-center text-sm justify-center w-full"
      >
        <input
          type="text"
          name="identifier"
          value={credential.identifier}
          onChange={handleChange}
          id="identifier"
          className="p-2 rounded-xl sm:min-w-[20rem] min-w-[90%] focus:outline-none focus:border-2 border-violet-500"
          placeholder="Email or Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credential.password}
          onChange={handleChange}
          id="password"
          className="p-2 rounded-xl sm:min-w-[20rem] min-w-[90%] focus:outline-none focus:border-2 border-violet-500"
          placeholder="Password"
          required
        />

        {status === "failed" ? (
          <h1 className="text-red-600">authentication failed</h1>
        ) : null}

        <button
          type="submit"
          className="bg-green-500 px-5 py-2 rounded-xl w-[7rem]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "login"}
        </button>
      </form>

      <div className="flex gap-5 flex-col justify-center items-center mt-4">
        <h1 className="text-white flex">
          Or
        </h1>

        <button
         onClick={googleRequestFunction} className="px-3 py-1 rounded-md text-black hover:bg-slate-400 bg-slate-100 flex justify-between items-center gap-3">
          <FcGoogle className="text-2xl" /> <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
