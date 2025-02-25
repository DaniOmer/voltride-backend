import { IDomainEvent } from "../../../../../shared/domain";
import { NotificationStrategy } from "../../../../../shared/infrastructure";

export class SendWelcomeMessageHandler {
  constructor(public readonly messenger: NotificationStrategy) {}

  async handle(event: IDomainEvent) {
    console.log("SendWelcomeMessageHandler: ", event);
  }
}
