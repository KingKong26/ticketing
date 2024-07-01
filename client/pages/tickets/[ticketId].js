import React from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
import { Button } from "@/components/ui/button";

const TicketShow = ({ ticket, currentUser }) => {
  console.log(ticket);
  console.log(currentUser);
  const { doRequest, errors } = useRequest({
    url: "/api/orders/",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  return (
    <div className="m-5">
      <p className="text-muted-foreground font-medium text-lg mb-3">Ticket</p>
      <div className="flex gap-2 flex-col">
        <h1 className="text-2xl font-bold text-gray-700 pt-3">
          {ticket.title}
        </h1>
        <h4 className="text-lg font-semibold text-muted-foreground pb-3">
          Price: <span className="pl-4"> {ticket.price}</span>
        </h4>
        {errors}
        <Button
          onClick={() => doRequest()}
          className="btn btn-primary"
          // disabled={currentUser.id === ticket.userId}
        >
          Purchase
        </Button>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default TicketShow;
