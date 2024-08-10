"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "@/utils/Frontend/store/user/userThunks"; // Adjust the import path as necessary

const EditProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.user); // Access both status and user from the state

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    gender: user?.gender || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the update action and wait for it to complete
      const resultAction = await dispatch(editUser(formData));

      // Check if the action was successful
      if (editUser.fulfilled.match(resultAction)) {
        // Redirect to the profile page on successful update
        router.push("/profile");
      } else {
        // Handle errors if the action was rejected
        console.error("Failed to update profile:", resultAction.payload);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex m-10 h-[70vh] justify-center items-center flex-col gap-5">
      <h1>Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <label htmlFor="mobile">Mobile:</label>
        <input
          type="text"
          name="mobile"
          id="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
