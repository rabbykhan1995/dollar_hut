"use client";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const getUserEmail = async () => {
    const response = await fetch("/api/contact", { cache: "no-cache" });
    const data = await response.json();
    if (data) {
      setEmail(data.result);
    }
  };
  useEffect(() => {
    getUserEmail();
  }, []);

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
      setMessage("");
      setEmail(data.result.email);
      setApiResponse(data.msg); // Clear the message field after successful submission
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-10 flex flex-col gap-10 h-[70vh] justify-center items-center"
    >
      {apiResponse !== "" ? (
        <div className="px-10">
          <h1 className="text-xl text-green-400">Message sent {apiResponse}</h1>
          <h1 className="text-zinc-400">
            you will recieve an email in -{" "}
            <span className="font-extralight text-sm font-mon">{email}</span> as
            soon as possible
          </h1>
        </div>
      ) : null}
      <label htmlFor="email" className="sm:p-10 p-5">
        Input your email or use a valid email to getting response from us.
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
        className="text-gray-500 text-sm min-w-[15rem] px-4 py-1 rounded-xl focus:outline-none border-2 focus:border-green-400"
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
