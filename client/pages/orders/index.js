import React from "react";

const OrderIndex = ({ orders }) => {
  return (
    <div className="m-5">
      <p className="text-muted-foreground font-medium text-lg mb-3">Orders</p>
      <div className="flex gap-2 flex-col">
        {!orders.length && (
          <div className="text-lg font-semibold">You haven't made any purchases yet!!</div>
        )}
        {orders.map((order) => (
          <div
            className="flex justify-between border-b-2 border-spacing-x-0.5 border-separate pb-2"
            key={order.id}
          >
            <div className="text-lg font-semibold">{order.ticket.title}</div>
            <div className="text-lg font-medium capitalize">{order.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");
  return { orders: data };
};

export default OrderIndex;
