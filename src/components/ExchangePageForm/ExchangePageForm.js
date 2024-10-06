"use client";
import { useState, useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ExchangePageForm = () => {
  const dispatch = useDispatch();
  const { rate, error, status } = useSelector((state) => state.rate);

  const [method, setMethod] = useState("t");
  const [formData, setFormData] = useState({
    method: "t",
    requestedWithBank: "bkash",
    requestedForBank: "dogecoin",
    requestedWithBankDetails: "",
    requestedForBankDetails: "",
    amount: "",
  });

  useEffect(() => {
    // Reset amount when the method changes
    setFormData((prev) => ({
      ...prev,
      amount: "",
    }));
  }, [method]);

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
      const response = await fetch(`/api/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-cache",
      });

      const data = await response.json();

      if (data.result) {
        setFormData({
          method: "t",
          requestedWithBank: "bkash",
          requestedForBank: "dogecoin",
          requestedWithBankDetails: "",
          requestedForBankDetails: "",
          amount: "",
        });
        return alert(`${data.msg}`);
      }
      return alert(data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to calculate the amount the user will receive
  const calculateAmount = () => {
    const { amount, method, requestedWithBank, requestedForBank } = formData;
    const amountNumber = parseFloat(amount);

    if (!amountNumber || !rate.result) return 0;

    if (method === "t") {
      const buyingRate = rate.result.buyingRates[requestedForBank];
      if (buyingRate === undefined) {
        console.warn(`Buying rate for ${requestedForBank} is undefined.`);
        return "N/A";
      }
      return (amountNumber / buyingRate).toFixed(2);
    } else {
      const sellingRate = rate.result.sellingRates[requestedWithBank];
      if (sellingRate === undefined) {
        console.warn(`Selling rate for ${requestedWithBank} is undefined.`);
        return "N/A";
      }
      return (amountNumber * sellingRate).toFixed(2);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 justify-center items-center"
    >
      <div className="flex gap-5">
        <label htmlFor="method"> Method</label>
        <select
          required
          name="method"
          id="method"
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            handleChange(e);
          }}
          className="text-black rounded-xl focus:outline-none focus:border border-green-600 py-1 px-5"
        >
          <option disabled defaultChecked>
            Select method
          </option>
          <option value="t">Taka to Dollar</option>
          <option value="d">Dollar to Taka</option>
        </select>
      </div>

      {method === "t" ? (
        <div className="flex justify-between gap-5 items-center p-5 sm:p-0">
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center border-4 hover:border-green-400 p-2">
            <label htmlFor="requestedWithBank"> Bank name</label>
            <select
              required
              name="requestedWithBank"
              id="requestedWithBank"
              onChange={handleChange}
              value={formData.requestedWithBank}
              className="text-black h-[3vh]"
            >
              <option
                value="bkash"
                data-imagesrc="https://res.cloudinary.com/dstwflz0y/image/upload/v1721188092/Logo/Taka/o7ypjttreqdvxoxne0os.png"
              >
                Bkash
              </option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="upay">Upay</option>
            </select>
          </div>

          <h1 className="text-3xl">
            <FaLongArrowAltRight />
          </h1>
          <div className="flex gap-5 border-4 p-2 hover:border-green-400 justify-center items-center flex-col sm:flex-row">
            <label htmlFor="requestedForBank"> Bank name</label>
            <select
              required
              name="requestedForBank"
              id="requestedForBank"
              onChange={handleChange}
              value={formData.requestedForBank}
              className="text-black h-[3vh] focus:outline-none focus:border-2 border-violet-400"
            >
              <option value="dogecoin">Doge coin</option>
              <option value="ethereum">Ethereum</option>
              <option value="litecoin">Lite Coin</option>
              <option value="payeer">Payeer</option>
              <option value="perfectmoney">Perfect Money</option>
              <option value="pyypl">Pyypl</option>
              <option value="shibcoin">Shib</option>
              <option value="tether">Tether</option>
              <option value="troncoin">Tron</option>
              <option value="webmoney">Web Money</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-5 items-center p-5 sm:p-0">
          <div className="flex gap-5 border-4 p-2 hover:border-green-400 justify-center items-center flex-col sm:flex-row">
            <label htmlFor="requestedWithBank"> Bank name</label>
            <select
              required
              name="requestedWithBank"
              id="requestedWithBank"
              onChange={handleChange}
              value={formData.requestedWithBank}
              className="text-black h-[3vh]"
            >
              <option value="dogecoin">Doge</option>
              <option value="ethereum">Ethereum</option>
              <option value="litecoin">Lite Coin</option>
              <option value="payeer">Payeer</option>
              <option value="perfectmoney">Perfect Money</option>
              <option value="pyypl">Pyypl</option>
              <option value="shibcoin">Shib</option>
              <option value="tether">Tether</option>
              <option value="troncoin">Tron</option>
              <option value="webmoney">Web Money</option>
            </select>
          </div>
          <h1 className="text-3xl">
            <FaLongArrowAltRight />
          </h1>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center border-4 hover:border-green-400 p-2">
            <label htmlFor="requestedForBank"> Bank name</label>
            <select
              required
              name="requestedForBank"
              id="requestedForBank"
              onChange={handleChange}
              value={formData.requestedForBank}
              className="text-black h-[3vh]"
            >
              <option value="bkash">Bkash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="upay">Upay</option>
            </select>
          </div>
        </div>
      )}
      <div className="flex gap-5">
        <label htmlFor="amount">
          Amount in {method === "t" ? "Taka" : "Dollar"}
        </label>
        <input
          required
          type="number"
          name="amount"
          id="amount"
          onChange={handleChange}
          value={formData.amount}
          placeholder={`Amount in ${method === "t" ? "Taka" : "Dollar"}`}
          className="text-black px-5 rounded-xl focus:outline-none focus:border border-green-600 py-1"
        />
      </div>
      {/* Display the calculated amount the user will receive */}
      <h1>
        You will receive
        <span className="text-red-600">
          {formData.amount !== "" ? ` ${calculateAmount()}` : " 0 "}
        </span>
        {method === "t" ? " Dollar " : " Taka "} in your{" "}
        {formData.requestedForBank} account
      </h1>

      {formData.requestedWithBank && (
        <div className="flex gap-5">
          <label htmlFor="requestedWithBankDetails">
            {formData.requestedWithBank} Number
          </label>
          <input
            required
            type="text"
            name="requestedWithBankDetails"
            id="requestedWithBankDetails"
            onChange={handleChange}
            value={formData.requestedWithBankDetails}
            placeholder={`Enter your ${formData.requestedWithBank} number`}
            className="text-black px-5 rounded-xl focus:outline-none focus:border border-green-600 py-1"
          />
        </div>
      )}
      {formData.requestedForBank && (
        <div className="flex gap-5">
          <label htmlFor="requestedForBankDetails">
            {formData.requestedForBank} Number
          </label>
          <input
            required
            type="text"
            name="requestedForBankDetails"
            id="requestedForBankDetails"
            onChange={handleChange}
            value={formData.requestedForBankDetails}
            placeholder={`Enter your ${formData.requestedForBank} number`}
            className="text-black px-5 rounded-xl focus:outline-none focus:border border-green-600 py-1"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-transparent text-lg text-white hover:bg-green-500 py-2 px-5 border-2 rounded-2xl"
      >
        Send request
      </button>
    </form>
  );
};

export default ExchangePageForm;
