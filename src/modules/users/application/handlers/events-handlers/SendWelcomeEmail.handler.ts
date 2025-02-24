import { IDomainEvent, NotificationStrategy } from "../../../../../shared";

export class SendWelcomeMessageHandler {
  constructor(public readonly messenger: NotificationStrategy) {}

  async handle(event: IDomainEvent) {
    console.log("SendWelcomeMessageHandler: ", event);
  }
}
