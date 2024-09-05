"use client";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "succeeded" && user.email) {
      setEmail(user.email);
    }
  }, [status, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, email }),
        cache: "no-cache",
      });
      const data = await response.json();
      console.log(data);
      setMessage("");
      setEmail(data.result.email);
      setApiResponse(data); // Clear the message field after successful submission
    } catch (error) {
      setApiResponse(error.msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-10 flex flex-col gap-10 h-[70vh] justify-center items-center"
    >
      {apiResponse !== "" ? (
        <div className="px-10">
          <h1 className="text-xl text-green-400">
            Message sent {apiResponse.msg}
          </h1>
          <h1 className="text-zinc-400">
            you will recieve an email in -{" "}
            <span className="font-extralight text-sm font-mono">
              {apiResponse.result.email}
            </span>{" "}
            as soon as possible
          </h1>
        </div>
      ) : apiResponse.msg === "failed" ? (
        <div className="px-10">
          <h1 className="text-xl text-red-500">{apiResponse.msg}</h1>
        </div>
      ) : null}
      <label htmlFor="email" className="sm:p-10 p-5">
        wait for our response to your valid email from us.
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={
          status !== "loading" && status !== "failed" ? email : "loading..."
        }
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder={
          status === "loading"
            ? "loading"
            : status === "succeeded"
            ? user.email
            : "no user email"
        }
        className="text-black text-sm min-w-[15rem] px-4 py-1 rounded-xl focus:outline-none border-2 focus:border-green-400"
        required
      />
      <textarea
        name="message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-sm text-gray-500 p-2 w-[80vw] sm:w-[60vw] md:w-[35vw] h-[20vh] rounded-xl focus:outline-none border-2 focus:border-green-400"
        placeholder="Enter your message here"
        required
      ></textarea>
      <button
        type="submit"
        className="flex  justify-center items-center  gap-4 bg-green-700 hover:bg-green-800 rounded-xl px-5 py-1 text-white"
      >
        <span>Send</span>
        <IoSend />
      </button>
    </form>
  );
};

export default ContactForm;
