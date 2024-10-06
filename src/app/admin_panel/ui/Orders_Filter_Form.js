"use client";

import { useState } from "react";
import Order_List from "./Order_List";

const Orders_Filter_Form = () => {
  const [takaToDollar, setTakaToDollar] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState({
    method: "t",
    state: "All",
    from: "",
    to: "",
    date: "",
    showby: "10",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilteredData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "method") {
      setTakaToDollar(value === "t");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin_panel/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
        cache: "no-cache",
      });

      const data = await response.json();
      if (data.result) {
        setResponseData(data.result);
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <div>
          <label htmlFor="method" className="p-4">
            Method
          </label>
          <select
            onChange={handleChange}
            value={filteredData.method}
            name="method"
            id="method"
            className="text-black"
          >
            <option value="b">Both</option>
            <option value="t">Taka To Dollar</option>
            <option value="d">Dollar To Taka</option>
          </select>
        </div>

        <div className="flex gap-5">
          <label htmlFor="state">
            <select
              className="text-black px-2"
              name="state"
              id="state"
              value={filteredData.state}
              onChange={handleChange}
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Processing">Processing</option>
              <option value="Converted">Converted</option>
            </select>
          </label>
        </div>

        {filteredData.method !== "b" && (
          // Render the amount filter fields only if the method is not set to "Both"
          <div className="flex gap-5">
            <label htmlFor="amount">Filter via Amount</label>
            <div className="flex gap-5">
              <input
                type="number"
                name="from"
                id="from"
                placeholder={takaToDollar ? "Taka" : "Dollar"}
                value={filteredData.from}
                onChange={handleChange}
                className="text-black px-2 text-sm w-[100px]"
              />
              <h1>to</h1>
              <input
                type="number"
                name="to"
                id="to"
                placeholder={takaToDollar ? "Dollar" : "Taka"}
                value={filteredData.to}
                onChange={handleChange}
                className="text-black px-2 text-sm w-[100px]"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <label htmlFor="date">Filter via Date & Time</label>
          <input
            type="date"
            name="date"
            id="date"
            value={filteredData.date}
            onChange={handleChange}
            className="text-black px-2 w-[]"
          />
        </div>
        <div className="flex gap-5">
          <label htmlFor="showby">Show By</label>
          <select
            className="text-black"
            id="showby"
            name="showby"
            onChange={handleChange}
            value={filteredData.showby}
          >
            <option id="10" value="10" defaultChecked>
              10
            </option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-orange-950 px-4 py-1 hover:bg-orange-900 rounded-xl"
        >
          Filter Now
        </button>
      </form>
      <Order_List data={responseData} />
    </div>
  );
};
export default Orders_Filter_Form;
