import { Publisher, OrderCreatedEvent, Subjects } from "@vmticket/common";

export class OrderCreatePublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
