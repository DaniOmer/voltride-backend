import { NotificationStrategy } from "../../application/services/notification.strategy";
import { EmailNotification } from "./notification.email";
import { SMSNotification } from "./notification.sms";
import { BadRequestError } from "../../domain";

export class NotificationFactory {
  static create(strategy: string): NotificationStrategy {
    switch (strategy) {
      case "email":
        return new EmailNotification();
      case "sms":
        return new SMSNotification();
      default:
        throw new BadRequestError({
          message: "Invalid notification strategy",
          logging: true,
        });
    }
  }
}
