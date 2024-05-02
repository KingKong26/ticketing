import { Subjects, Publisher, PaymentCreatedEvent } from "@vmticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
