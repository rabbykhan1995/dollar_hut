"use client";

const Order_List = ({ data }) => {
  return (
    <div>
      <h1>
        {data.length === 0 ? "no order found" : `${data.length} order found`}
      </h1>
      {data.map((order, index) => {
        return (
          <div key={index}>
            <h1>{order.id}</h1>
          </div>
        );
      })}
    </div>
  );
};
export default Order_List;
