import { Publisher, Subjects, TicketUpdatedEvent } from "@vmticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
