import { AppConfig } from "../../../../../config/app.config";
import { IDomainEvent } from "../../../../../shared/domain";
import { NotificationStrategy } from "../../../../../shared/application";

export class SendWelcomeMessageHandler {
  constructor(public readonly messenger: NotificationStrategy) {}

  async handle(event: IDomainEvent) {
    const confirmationLink = `${AppConfig.client.url}/auth/email-validation?token=${event.payload.hash}`;
    await this.messenger.send({
      recipient: event.payload.email,
      subject: "Bienvenue sur VoltRide",
      templateName: "welcome-email.html",
      params: {
        confirmation_link: confirmationLink,
      },
    });
  }
}
