"use client";
import { useEffect, useState } from "react";

const NewsPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/news`, {
        cache: "no-cache",
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.msg);
      }

      setResult(data.result);
    } catch (error) {
      console.error("Fetch error:", error.message, error.stack);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     fetchData();
  }, []);
  if (loading) return null;
  if (error) return <div>Error: {error}</div>;
  if (!result || !result.updatedAt) return <div>No news published yet</div>;

  const date = new Date(result.updatedAt);

  // Format the date to a readable format
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <div className="flex justify-center items-center min-h-[70vh] flex-col gap-5 m-5">
      <h1 className="text-3xl">Today&apos;s Top News is - </h1>
      <div className="flex flex-col gap-5 w-full p-7 border bg-zinc-500 rounded-xl">
        <h1 className="text-2xl flex gap-5 justify-start sm:justify-center items-center capitalize font-mono font-semibold">
          Title - {result.title}
        </h1>
        <p className="font-mono flex justify-start sm:justify-center items-center">
          {result.content}
        </p>
        <h5 className="text-xs flex justify-end mt-10 font-mono">
          Published on - {formattedDate} - by admin
        </h5>
      </div>
    </div>
  );
};

export default NewsPage;
