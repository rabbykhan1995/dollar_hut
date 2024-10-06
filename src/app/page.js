import prisma from "../../lib/prisma";

const HomePage = async () => {
  const fetchData = async () => {
    try {
      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/rates`,
        {
          cache: "no-cache",
        }
      );

      if (!response2.ok) {
        throw new Error("Failed to fetch data");
      }

      const data2 = await response2.json();

      return { data2 };
    } catch (error) {
      return { error: error.message };
    }
  };

  const { data2, error } = await fetchData();
  // const totalUser = await prisma.user.count();
  // const totalExchange = await prisma.exchange.count();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-10">
      <div className="flex flex-col sm:flex-row justify-between h-[100vh] gap-5 bg-[#e4ff82] text-[#1d1d1d] font-semibold italic">
        <div className="flex flex-col justify-center items-start p-5 w-full xs:w-1/2 space-y-4">
          <span className="text-5xl font-mono font-bold bg-gradient-to-r from-green-700 to-violet-500 bg-clip-text text-transparent">
            This is
          </span>
          <span className="text-2xl font-bold text-gray-800">Dollar Hut</span>
          {/* <h1 className="text-xl">Total User: {totalUser} User</h1> */}
          {/* <h1 className="text-xl">Total Order: {totalExchange}</h1> */}
        </div>
      </div>

      <div className="flex justify-center items-center p-10 min-h-[50vh] text-lg overflow-hidden text-red-500">
        <h1 className="whitespace-nowrap animate-marquee">
          আমি বলতে চাই যে সমস্ত লেনদেন আপনার খরচে সম্পন্ন হবে। এছাড়াও, টাকা
          থেকে ডলার এবং ডলার থেকে টাকা রূপান্তরের জন্য, প্রযোজ্য সমস্ত চার্জ
          ব্যবহারকারীকেই বহন করতে হবে।
        </h1>
      </div>

      {/* Dollar rate showing area */}
      <div className="flex flex-col sm:flex-row justify-around gap-10 font-mono text-zinc-600">
        <div className="Hero h-full flex flex-col justify-center items-center hover:border border-green-500 rounded-xl w-full">
          <h2 className="text-xl mb-5 text-white">Buying Rates</h2>
          <table className="min-w-full bg-white border rounded-lg ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Currency</th>
                <th className="py-2 px-4 border-b">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data2?.result?.buyingRates || {}).map(
                (rate, index) =>
                  rate !== "id" && (
                    <tr
                      key={rate}
                      className={`hover:bg-green-100 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-4 border-b">{rate}</td>
                      <td className="py-2 px-4 border-b">
                        {data2.result.buyingRates[rate]} tk
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        <div className="Hero h-full flex flex-col justify-center items-center hover:border border-green-500 rounded-xl w-full ">
          <h2 className="text-xl mb-5 text-white">Selling Rates</h2>
          <table className="min-w-full bg-white border rounded-lg  ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Currency</th>
                <th className="py-2 px-4 border-b">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data2?.result?.sellingRates || {}).map(
                (rate, index) =>
                  rate !== "id" && (
                    <tr
                      key={rate}
                      className={`hover:bg-green-100 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-4 border-b">{rate}</td>
                      <td className="py-2 px-4 border-b">
                        {data2.result.sellingRates[rate]} tk
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
