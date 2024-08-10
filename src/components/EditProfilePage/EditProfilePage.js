"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import { editUser } from "@/utils/Frontend/store/user/userThunks";

const EditProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { user, status, error } = userState;

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        old_password: "",
        new_password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editUser(formData));
  };

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/profile"); // Redirect to profile page or any other page
    }
  }, [status, router]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <h1>Edit Profile</h1>
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
          />
        </div>
        <div className="flex md:flex-row flex-col gap-5">
          <label htmlFor="old_password">Old Password :</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="old_password"
              id="old_password"
              placeholder="Old/Previous Password"
              value={formData.old_password}
              onChange={handleChange}
              className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md text-gray-600 text-sm font-light"
            />
            <button
              type="button"
              className="absolute right-0 text-gray-500 text-2xl"
              onClick={() => setShow(!show)}
            >
              {show ? <BiHide /> : <BiShow />}
            </button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-5">
          <label htmlFor="new_password">New Password :</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="new_password"
              id="new_password"
              placeholder="Min 8 characters New Password"
              value={formData.new_password}
              onChange={handleChange}
              className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md text-gray-600 text-sm font-light"
            />
            <button
              type="button"
              className="absolute right-0 text-gray-500 text-2xl"
              onClick={() => setShow(!show)}
            >
              {show ? <BiHide /> : <BiShow />}
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

        <button
          type="submit"
          className="px-5 py-1 w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] rounded-md bg-blue-500 hover:bg-blue-800 text-white"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
