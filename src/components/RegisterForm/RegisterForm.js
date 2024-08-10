"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import { registerUser } from "@/utils/Frontend/store/user/userThunks"; // Adjust the import path as necessary

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user); // Adjust the state selector

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData));
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/profile");
    }
  }, [status, router]); // Include `status` and `router` in the dependency array

  return (
    <div>
      {/* Uncomment the error message if needed */}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <h1>Register Here</h1>
        <div className="flex md:flex-row flex-col gap-5">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md text-gray-600"
            required
          />
        </div>

        <div className="flex md:flex-row flex-col gap-5">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example12345@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md text-gray-600 text-sm font-light"
            required
          />
        </div>
        <div className="flex md:flex-row flex-col gap-5">
          <label htmlFor="password">Password :</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={handleChange}
              className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md text-gray-600 text-sm font-light"
              required
            />
            <button
              type="button"
              className="absolute right-0 text-gray-500 text-2xl"
              onClick={() => setShow(!show)}
            >
              {show ? <BiShow /> : <BiHide />}
            </button>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-5">
          <label htmlFor="mobile">Mobile :</label>
          <input
            type="text"
            placeholder="017********"
            name="mobile"
            id="mobile"
            onChange={handleChange}
            value={formData.mobile}
            className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md text-gray-600 text-sm font-light"
          />
        </div>

        <div className="flex justify-center">
          <label htmlFor="gender">Gender :</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-4 text-gray-600"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md bg-blue-500 text-white"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
