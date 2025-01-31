"use client";
import { useEffect } from "react";

const Page = () => {
  const sendToken = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/google`,
        {
          method: "POST",
          body: JSON.stringify({ accessToken: token }),
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );

      if (response.ok) {
        window.location.href = `${process.env.NEXT_PUBLIC_HOST}/profile`;
      } else {
        window.location.href = `${process.env.NEXT_PUBLIC_HOST}/login`;
      }
    } catch (error) {
      console.error("Error sending token:", error);
      window.location.href = `${process.env.NEXT_PUBLIC_HOST}/login`;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Extract token from URL fragment (#access_token=...)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const token = hashParams.get("access_token");

      if (token) {
        sendToken(token);
      } else {
        console.error("No token found in URL.");
        window.location.href = `${process.env.NEXT_PUBLIC_HOST}/login`;
      }
    }
  }, []);

  return <div className="flex justify-center items-center w-screen py-10">Redirecting...</div>;
};

export default Page;