"use client";

import { useEffect, useState } from "react";

const News_Form_Page = () => {
  const [news, setNews] = useState({ title: "", content: "" });
  const [oldNews, setOldNews] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin_panel/customize_page/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news),
        cache: "no-cache",
      });
      const data = await response.json();
      alert(`${data.msg}`);
      setNews({ title: "", content: "" });
      setOldNews({ title: data.result.title, content: data.result.content });
    } catch (error) {
      alert(`${error.msg}`);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/news`, {
          cache: "no-cache",
        });
        const data = await response.json();
        // Logs only when component mounts

        // Check if data.result exists before trying to access its properties
        if (data.result) {
          setOldNews({
            title: data.result.title || "No title",
            content: data.result.content || "No content",
          });
        } else {
          console.error("No result found in data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 items-center justify-center min-h-[70vh]"
    >
      <input
        type="text"
        name="title"
        id="title"
        onChange={handleChange}
        value={news.title}
        className="sm:w-[50vw] w-[90vw] focus:outline-none border-2 border-violet-600 text-sm text-black rounded-xl px-5 py-1"
        placeholder="Your news title"
      />
      <textarea
        name="content"
        id="content"
        onChange={handleChange}
        value={news.content}
        placeholder="Text your news"
        className="text-black h-[20vh] p-5 rounded-xl sm:w-[50vw] w-[90vw] focus:outline-none border-2 border-violet-600 text-sm"
      />
      <button type="submit" className="px-5 py-1 bg-violet-500 rounded-xl">
        Publish
      </button>

      <div className="flex flex-col gap-5 justify-center border p-5 w-[80vw] sm:w-[60vw]">
        <h1>{oldNews.title}</h1>
        <p>{oldNews.content}</p>
      </div>
    </form>
  );
};
export default News_Form_Page;
