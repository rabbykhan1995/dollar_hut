"use client";
import { useEffect, useState } from "react";

const RateForm = () => {
  const [buyingRate, setBuyingRate] = useState({});
  const [sellingRate, setSellingRate] = useState({});
  const [initialBuyingRate, setInitialBuyingRate] = useState({});
  const [initialSellingRate, setInitialSellingRate] = useState({});
  const [userBuyingRate, setUserBuyingRate] = useState({});
  const [userSellingRate, setUserSellingRate] = useState({});

  const handleBuyingChange = (e) => {
    const { name, value } = e.target;
    setUserBuyingRate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSellingChange = (e) => {
    const { name, value } = e.target;
    setUserSellingRate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/rates", {
          cache: "no-cache",
        });
        const data = await response.json();

        setInitialBuyingRate(data.result?.buyingRates || {});
        setInitialSellingRate(data.result?.sellingRates || {});

        setBuyingRate(data.result?.buyingRates || {});
        setSellingRate(data.result?.sellingRates || {});
      } catch (error) {
        console.log(error);
      }
    };

    fetchRates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin_panel/rates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newBuyingRates: { ...buyingRate, ...userBuyingRate },
          newSellingRates: { ...sellingRate, ...userSellingRate },
        }),
        cache: "no-cache",
      });

      const data = await response.json();

      if (data.msg === "Success") {
        setInitialBuyingRate(data.result?.buyingRates || {});
        setInitialSellingRate(data.result?.sellingRates || {});
        setBuyingRate(data.result?.buyingRates || {});
        setSellingRate(data.result?.sellingRates || {});
        setUserBuyingRate({});
        setUserSellingRate({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 justify-center items-center "
    >
      <div className="">
        <h2>Buying Rates</h2>
        {Object.keys(initialBuyingRate).map(
          (bank) =>
            bank !== "id" && (
              <div key={bank} className="flex flex-col gap-5">
                <input
                  type="text"
                  name={bank}
                  id={bank}
                  value={userBuyingRate[bank] || ""}
                  onChange={handleBuyingChange}
                  placeholder={` ${bank}: ${initialBuyingRate[bank]}`}
                  className="text-black px-5 py-1 rounded-xl border-2 focus:border-blue-700 focus:outline-none"
                />
              </div>
            )
        )}
      </div>

      <div>
        <h2>Selling Rates</h2>
        {Object.keys(initialSellingRate).map(
          (bank) =>
            bank !== "id" && (
              <div key={bank} className="flex flex-col gap-5">
                <input
                  type="text"
                  name={bank}
                  id={bank}
                  value={userSellingRate[bank] || ""}
                  onChange={handleSellingChange}
                  placeholder={` ${bank}: ${initialSellingRate[bank]}`}
                  className="text-black px-5 py-1 rounded-xl border-2 focus:border-blue-700 focus:outline-none"
                />
              </div>
            )
        )}
      </div>

      <button type="submit" className="px-4 py-1 bg-blue-500 rounded-xl">
        Submit
      </button>
    </form>
  );
};

export default RateForm;
