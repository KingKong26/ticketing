import { Listener, OrderCancelledEvent, Subjects } from "@vmticket/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log("data", data);
    try {
      const ticket = await Ticket.findById(data.ticket.id);
      if (!ticket) {
        throw new Error("Ticket not found");
      }

      ticket.set({ orderId: undefined });

      await ticket.save();

      await new TicketUpdatedPublisher(this.client).publish({
        id: ticket.id,
        orderId: ticket.orderId,
        userId: ticket.userId,
        price: ticket.price,
        title: ticket.title,
        version: ticket.version,
      });

      msg.ack();
    } catch (error) {
      console.log("error happened here", error);
    }
  }
}
