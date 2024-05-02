import { Subjects, Publisher, ExpirationCompleteEvent } from "@vmticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
