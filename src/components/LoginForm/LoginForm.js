"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/utils/Frontend/store/user/userThunks"; // Adjust the import path if necessary

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { status, user } = useSelector((state) => state.user); // Adjust the state selector if necessary

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
      const resultAction = dispatch(loginUser(credential));
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/profile");
    }
  }, [status === "succeeded"]);

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
          className="p-2 rounded-md sm:min-w-[20rem] min-w-[90%]"
          placeholder="Email or Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credential.password}
          onChange={handleChange}
          id="password"
          className="p-2 rounded-md sm:min-w-[20rem] min-w-[90%]"
          placeholder="Password"
          required
        />

        {status === "failed" ? (
          <h1 className="text-red-600">authentication failed</h1>
        ) : null}

        <button
          type="submit"
          className="bg-green-500 px-5 py-2 rounded-lg w-[7rem]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
