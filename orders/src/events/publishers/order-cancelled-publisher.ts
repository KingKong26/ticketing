import { Publisher, OrderCancelledEvent, Subjects } from "@vmticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
