import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: () => Router.push("/orders"),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);
  if (timeLeft < 0) {
    return (
      <div className="m-5">
        <p className="text-red-600 font-medium text-lg mb-3">Order expired!!</p>
      </div>
    );
  }
  console.log(order, "key");
  return (
    <div className="m-5">
      <p className="text-muted-foreground font-medium text-lg mb-3">
        Order: {order.id}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-600">
            Title: <span className="pl-4"> {order.ticket.title}</span>
          </h4>
          <h4 className="text-lg font-semibold text-gray-600">
            Price: <span className="pl-4"> {order.ticket.price}</span>
          </h4>
          <h4 className="text-lg font-semibold text-gray-600 pb-1">
            Status: <span className="pl-4 capitalize"> {order.status}</span>
          </h4>
        </div>
        <h4 className="text-lg font-semibold text-muted-foreground pb-3">
          Time Left to pay: {timeLeft} seconds
        </h4>

        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </div>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
