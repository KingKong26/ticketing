import { Publisher, Subjects, TicketCreatedEvent } from "@vmticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
