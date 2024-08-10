import ExchangeInHomePage from "@/components/ExchangeInHomePage/ExchangeInHomePage";

const fetchData = async () => {
  try {
    const response1 = await fetch(
      `${process.env.HOST}/api/admin_panel/customize_page/home`,
      { cache: "no-cache" }
    );
    const response2 = await fetch(`${process.env.HOST}/api/admin_panel/rates`, {
      cache: "no-cache",
    });

    if (!response1.ok || !response2.ok) {
      throw new Error("Failed to fetch data");
    }

    const data1 = await response1.json();
    const data2 = await response2.json();

    return { data1, data2 };
  } catch (error) {
    return { error: error.message };
  }
};

const HomePage = async () => {
  const { data1, data2, error } = await fetchData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-10">
      <h1>this is a sipons home page</h1>
      <div>
        <h1>Total User : 40000 User</h1>
      </div>

      <div className="flex flex-col sm:flex-row h-[60vh] gap-5">
        <div className="Hero h-full flex flex-col justify-center items-center hover:border border-green-500 rounded-xl w-full ">
          <span className=" text-5xl font-mono font-bold  bg-gradient-to-r from-blue-700 to-green-500 bg-clip-text text-transparent">
            This is
          </span>
          <span className="text-xl">Dollar Hut</span>
        </div>

        <ExchangeInHomePage />
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
